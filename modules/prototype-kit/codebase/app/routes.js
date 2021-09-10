const axios = require('axios')
const express = require('express')
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage })
const router = express.Router()

//From Beta, all versions have their own router files:
require(`./views/beta-1/_routes.js`)(router);

// Add your routes here - above the module.exports line
router.post(
  '/sprint2/upload/tabular-data',
  upload.single('file'),
  async (req, res) => {
    const url = process.env.TABULAR_PARSER_URI
    const {buffer: file, mimetype, originalname: filename} = req.file

    const {data: parsedTabularDocument} = await axios.post(url, {
      file: file.toString('base64'),
      filename,
      mimetype,
    })
    console.log(parsedTabularDocument.data.column_mapping)

    req.session.data.columns = parsedTabularDocument.data.columns
    if (process.env.USE_LAMBDA_MAPPINGS && parsedTabularDocument.data.column_mapping){
      req.session.data.columnMappings = parsedTabularDocument.data.column_mapping
    }

    console.log(req.session.data)
    const nextPage = `/${req.query.template || "tasklist"}`
    res.redirect(nextPage)
  },
)

router.post(
  '/sprint2/save-mapping',
  async (req, res) => {
    const mapFrom = req.session.data.mapFrom
    const mapTo = req.session.data.mapTo

    req.session.data
      .columnMappings[mapFrom] = mapTo

    const nextPage = `/sprint2/${req.query.template || "tasklist"}`
    res.redirect(nextPage)
  }
)

// Sprint 10 //
router.get('/sprint10/nextIncompleteSection', function (req, res) {

  const sections = ['household', 'household-situation', 'household-needs', 'tenancy', 'property', 'income-and-benefits', 'rent', 'local-authority', 'submission']
  const incompleteSections = []
  sections.forEach(function (section, i) {
    if(!req.session.data[section + '-completed']) {
      incompleteSections.push(section)
    }
  });

  res.redirect(incompleteSections[0] + '-section')
})


function redirectToNextFormPage(req, res, section, sectionPageMap) {
  const sectionPages = Object.keys(sectionPageMap)
  const next = req.session.data['next-page']
  idx = Math.max(sectionPages.indexOf(next), 0)

  // Get next incomplete page in the section
  const incompleteSectionPages = []
  sectionPages.slice(idx, sectionPages.length + 1).forEach(function (page, i) {
    questions = sectionPageMap[page]
    questions.forEach(function (question, i) {
      if(!req.session.data[question]) {
        incompleteSectionPages.push(page)
      }
    })
  });

  const nextPage = incompleteSectionPages[0] || 'check-answers'
  res.redirect(section + nextPage)
}

router.get('/sprint10/household-section', function (req, res) {
  const section = 'household/'
  let sectionPageMap = {
    'tenant-code': ['tenant-code'],
    'tenant-age': ['tenant-age'],
    'gender': ['gender'],
    'ethnicity': ['ethnicity'],
    'nationality': ['nationality'],
    'economic-status': ['economic-status'],
    'other-household-members': ['number-of-other-members']
  }
  if(req.session.data['number-of-other-members'] && req.session.data['number-of-other-members'] > 0){
    for(let i=1; i <= req.session.data['number-of-other-members']; i++){
      sectionPageMap['other-household-members'].push('person-' + i + '-relationship-to-main')
      sectionPageMap['other-household-members'].push('person-' + i + '-age')
      sectionPageMap['other-household-members'].push('person-' + i + '-gender')
      sectionPageMap['other-household-members'].push('person-' + i + '-economic-status')
    }
  }
  redirectToNextFormPage(req, res, section, sectionPageMap)
})

router.get('/sprint10/household-situation-section', function (req, res) {
  const section = 'household-situation/'
  let sectionPageMap = {
    'previous-housing-situation': ['previous-housing-situation'],
    'homeless': ['homeless'],
    'reason-for-leaving': ['reason-for-leaving', 'removal-reason']
  }
  if(req.session.data['reason-for-leaving'] == 'Other'){
    sectionPageMap['reason-for-leaving'].push('other-reason-for-leaving')
  }
  redirectToNextFormPage(req, res, section, sectionPageMap)
})

router.get('/sprint10/household-needs-section', function (req, res) {
  const section = 'household-needs/'
  let sectionPageMap = {
    'armed-forces': ['tenant-code'],
    'disabilities': ['long-term-conditions'],
    'pregnancy': ['pregnancy'],
    'requirements': ['requirements'],
    'conditions': ['conditions']
  }
  if(req.session.data['armed-forces'] != 'No' || req.session.data['armed-forces'] != 'Prefer not to say'){
    sectionPageMap['armed-forces'].push('armed-forces-tenure')
    sectionPageMap['armed-forces'].push('armed-forces-injured')
  }
  redirectToNextFormPage(req, res, section, sectionPageMap)
})

router.get('/sprint10/tenancy-section', function (req, res) {
  const section = 'tenancy/'
  const sectionPageMap = {
    'tenancy-code': ['tenancy-code'],
    'tenancy-start-date': ['tenancy-start-day'],
    'starter-tenancy': ['starter-tenancy'],
    'fixed-term': ['fixed-term'],
    'type-of-main-tenancy': ['type-of-main-tenancy'],
    'letting-type': ['letting-type'],
    'landlord': ['landlord']
  }
  redirectToNextFormPage(req, res, section, sectionPageMap)
})

router.get('/sprint10/property-section', function (req, res) {
  const section = 'property/'
  let sectionPageMap = {
    'property-location': ['property-location'],
    'postcode': ['postcode'],
    'relet': ['relet'],
    'reason-for-vacancy': ['reason-for-vacancy'],
    'property-reference': ['property-reference'],
    'type-of-unit': ['type-of-unit'],
    'type-of-building': ['type-of-building'],
    'number-of-bedrooms': ['bedrooms'],
    'void-date': ['void-date-day'],
    'repair-date': ['repairs'],
    'previously-offered': ['previously-offered'],
    'wheelchair-accessible': ['wheelchair-accessible']
  }
  if(req.session.data['repairs'] == 'Yes'){
    sectionPageMap['repair-date'].push('repair-date-day')
  }
  redirectToNextFormPage(req, res, section, sectionPageMap)
})

router.get('/sprint10/income-and-benefits-section', function (req, res) {
  const section = 'income-and-benefits/'
  const sectionPageMap = {
    'income': ['income', 'income-frequency'],
    'benefit-proportion': ['benefit-proportion'],
    'benefits': ['benefit']
  }
  redirectToNextFormPage(req, res, section, sectionPageMap)
})

router.get('/sprint10/rent-section', function (req, res) {
  const section = 'rent/'
  let sectionPageMap = {
    'rent': ['rent', 'rent-period', 'service-charge', 'personal-service-charge', 'support-charge', 'outstanding']
  }
  if(req.session.data['outstanding'] == 'Yes'){
    sectionPageMap['rent'].push('outstanding-amount')
  }
  redirectToNextFormPage(req, res, section, sectionPageMap)
})

router.get('/sprint10/local-authority-section', function (req, res) {
  const section = 'local-authority/'
  let sectionPageMap = {
    'time-lived-in-la': ['time-lived-in-la'],
    'time-on-waiting-list': ['time-on-waiting-list'],
    'previous-la': ['previous-la'],
    'previous-postcode': ['previous-postcode'],
    'reasonable-preference': ['reasonable-preference'],
    'allocation-type': ['choice-based', 'common-housing-register', 'common-allocation-policy']
  }
  if(req.session.data['reasonable-preference'] == 'Yes'){
    sectionPageMap['reasonable-preference'].push('reasonable-preference-reason')
  }
  redirectToNextFormPage(req, res, section, sectionPageMap)
})

router.get('/sprint10/submission-section', function (req, res) {
  const section = 'submission/'
  res.redirect(section + 'declaration')
})

router.get('/sprint11/household-section', function (req, res) {
  const section = 'household/'
  let sectionPageMap = {
    'tenant-code': ['tenant-code'],
    'tenant-age': ['tenant-age'],
    'gender': ['gender'],
    'ethnicity': ['ethnicity'],
    'nationality': ['nationality'],
    'economic-status': ['economic-status'],
    'other-household-members': ['number-of-other-members']
  }
  if(req.session.data['number-of-other-members'] && req.session.data['number-of-other-members'] > 0){
    for(let i=1; i <= req.session.data['number-of-other-members']; i++){
      sectionPageMap['other-household-members'].push('person-' + i + '-relationship-to-main')
      sectionPageMap['other-household-members'].push('person-' + i + '-age')
      sectionPageMap['other-household-members'].push('person-' + i + '-gender')
      sectionPageMap['other-household-members'].push('person-' + i + '-economic-status')
    }
  }
  redirectToNextFormPage(req, res, section, sectionPageMap)
})

router.get('/sprint11/household-situation-section', function (req, res) {
  const section = 'household-situation/'
  let sectionPageMap = {
    'previous-housing-situation': ['previous-housing-situation'],
    'homeless': ['homeless'],
    'reason-for-leaving': ['reason-for-leaving', 'removal-reason']
  }
  if(req.session.data['reason-for-leaving'] == 'Other'){
    sectionPageMap['reason-for-leaving'].push('other-reason-for-leaving')
  }
  redirectToNextFormPage(req, res, section, sectionPageMap)
})

router.get('/sprint11/household-needs-section', function (req, res) {
  const section = 'household-needs/'
  let sectionPageMap = {
    'armed-forces': ['tenant-code'],
    'disabilities': ['long-term-conditions'],
    'pregnancy': ['pregnancy'],
    'requirements': ['requirements'],
    'conditions': ['conditions']
  }
  if(req.session.data['armed-forces'] != 'No' || req.session.data['armed-forces'] != 'Prefer not to say'){
    sectionPageMap['armed-forces'].push('armed-forces-tenure')
    sectionPageMap['armed-forces'].push('armed-forces-injured')
  }
  redirectToNextFormPage(req, res, section, sectionPageMap)
})

router.get('/sprint11/tenancy-section', function (req, res) {
  const section = 'tenancy/'
  const sectionPageMap = {
    'tenancy-code': ['tenancy-code'],
    'tenancy-start-date': ['tenancy-start-day'],
    'starter-tenancy': ['starter-tenancy'],
    'fixed-term': ['fixed-term'],
    'type-of-main-tenancy': ['type-of-main-tenancy'],
    'letting-type': ['letting-type'],
    'landlord': ['landlord']
  }
  redirectToNextFormPage(req, res, section, sectionPageMap)
})

router.get('/sprint11/property-section', function (req, res) {
  const section = 'property/'
  let sectionPageMap = {
    'property-location': ['property-location'],
    'postcode': ['postcode'],
    'relet': ['relet'],
    'reason-for-vacancy': ['reason-for-vacancy'],
    'property-reference': ['property-reference'],
    'type-of-unit': ['type-of-unit'],
    'type-of-building': ['type-of-building'],
    'number-of-bedrooms': ['bedrooms'],
    'void-date': ['void-date-day'],
    'repair-date': ['repairs'],
    'previously-offered': ['previously-offered'],
    'wheelchair-accessible': ['wheelchair-accessible']
  }
  if(req.session.data['repairs'] == 'Yes'){
    sectionPageMap['repair-date'].push('repair-date-day')
  }
  redirectToNextFormPage(req, res, section, sectionPageMap)
})

router.get('/sprint11/income-and-benefits-section', function (req, res) {
  const section = 'income-and-benefits/'
  const sectionPageMap = {
    'income': ['income', 'income-frequency'],
    'benefit-proportion': ['benefit-proportion'],
    'benefits': ['benefit']
  }
  redirectToNextFormPage(req, res, section, sectionPageMap)
})

router.get('/sprint11/rent-section', function (req, res) {
  const section = 'rent/'
  let sectionPageMap = {
    'rent': ['rent', 'rent-period', 'service-charge', 'personal-service-charge', 'support-charge', 'outstanding']
  }
  if(req.session.data['outstanding'] == 'Yes'){
    sectionPageMap['rent'].push('outstanding-amount')
  }
  redirectToNextFormPage(req, res, section, sectionPageMap)
})

router.get('/sprint11/local-authority-section', function (req, res) {
  const section = 'local-authority/'
  let sectionPageMap = {
    'time-lived-in-la': ['time-lived-in-la'],
    'time-on-waiting-list': ['time-on-waiting-list'],
    'previous-la': ['previous-la'],
    'previous-postcode': ['previous-postcode'],
    'reasonable-preference': ['reasonable-preference'],
    'allocation-type': ['choice-based', 'common-housing-register', 'common-allocation-policy']
  }
  if(req.session.data['reasonable-preference'] == 'Yes'){
    sectionPageMap['reasonable-preference'].push('reasonable-preference-reason')
  }
  redirectToNextFormPage(req, res, section, sectionPageMap)
})

router.get('/sprint11/submission-section', function (req, res) {
  const section = 'submission/'
  res.redirect(section + 'declaration')
})



module.exports = router
