const axios = require('axios')
const express = require('express')
const multer = require('multer')

const storage = multer.memoryStorage()
const upload = multer({ storage })
const router = express.Router()

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

router.get('/sprint10/household-section', function (req, res) {

  const section = 'household/'
  const sectionPages = ['tenant-code', 'tenant-age', 'gender', 'ethnicity', 'nationality', 'economic-status', 'other-household-members']
  const incompleteSectionPages = []
  sectionPages.forEach(function (page, i) {
    if(!req.session.data[page + '-page']) {
      incompleteSectionPages.push(page)
    }
  });

  res.redirect(section + incompleteSectionPages[0])
})

router.get('/sprint10/household-situation-section', function (req, res) {

  const section = 'household-situation/'
  const sectionPages = ['previous-housing-situation', 'homeless', 'reason-for-leaving']
  const incompleteSectionPages = []
  sectionPages.forEach(function (page, i) {
    if(!req.session.data[page + '-page']) {
      incompleteSectionPages.push(page)
    }
  });

  res.redirect(section + incompleteSectionPages[0])
})

router.get('/sprint10/household-needs-section', function (req, res) {

  const section = 'household-needs/'
  const sectionPages = ['armed-forces', 'disabilities', 'pregnancy', 'requirements', 'conditions']
  const incompleteSectionPages = []
  sectionPages.forEach(function (page, i) {
    if(!req.session.data[page + '-page']) {
      incompleteSectionPages.push(page)
    }
  });

  res.redirect(section + incompleteSectionPages[0])
})

router.get('/sprint10/tenancy-section', function (req, res) {

  const section = 'tenancy/'
  const sectionPages = ['tenancy-code', 'tenancy-start-date', 'starter-tenancy', 'fixed-term', 'type-of-main-tenancy', 'letting-type', 'landlord']
  const incompleteSectionPages = []
  sectionPages.forEach(function (page, i) {
    if(!req.session.data[page + '-page']) {
      incompleteSectionPages.push(page)
    }
  });

  res.redirect(section + incompleteSectionPages[0])
})

router.get('/sprint10/property-section', function (req, res) {

  const section = 'property/'
  const sectionPages = ['property-location', 'postcode', 'relet', 'reason-for-vacancy', 'property-reference',
  'type-of-unit', 'type-of-building', 'number-of-bedrooms', 'void-date', 'repair-date', 'previously-offered', 'wheelchair-accessible']
  const incompleteSectionPages = []
  sectionPages.forEach(function (page, i) {
    if(!req.session.data[page + '-page']) {
      incompleteSectionPages.push(page)
    }
  });

  res.redirect(section + incompleteSectionPages[0])
})

router.get('/sprint10/income-and-benefits-section', function (req, res) {

  const section = 'income-and-benefits/'
  const sectionPages = ['income', 'benefit-proportion', 'benefits']
  const incompleteSectionPages = []
  sectionPages.forEach(function (page, i) {
    if(!req.session.data[page + '-page']) {
      incompleteSectionPages.push(page)
    }
  });

  res.redirect(section + incompleteSectionPages[0])
})

router.get('/sprint10/rent-section', function (req, res) {

  const section = 'rent/'
  const sectionPages = ['rent']
  const incompleteSectionPages = []
  sectionPages.forEach(function (page, i) {
    if(!req.session.data[page + '-page']) {
      incompleteSectionPages.push(page)
    }
  });

  res.redirect(section + incompleteSectionPages[0])
})

router.get('/sprint10/local-authority-section', function (req, res) {

  const section = 'local-authority/'
  const sectionPages = ['time-lived-in-la', 'time-on-waiting-list', 'previous-la', 'previous-postcode', 'reasonable-preference', 'allocation-type']
  const incompleteSectionPages = []
  sectionPages.forEach(function (page, i) {
    if(!req.session.data[page + '-page']) {
      incompleteSectionPages.push(page)
    }
  });

  res.redirect(section + incompleteSectionPages[0])
})

router.get('/sprint10/submission-section', function (req, res) {
  const section = 'submission/'
  res.redirect(section + 'declaration')
})


module.exports = router
