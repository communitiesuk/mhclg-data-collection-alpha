const _ = require('lodash')
const validate = require("validate.js")

module.exports = function (router) {
  const version = 'beta-1'

  router.use(function(req,res,next) {
    req.session.data['version'] = version
    return next()
  })

  router.get('/beta-1/tasklist', function(req,res) {
    //work out the skip to links
    var skipTo = {}
    var tripSwitch = false
    for(section of req.session.data[version]['sections']) {
      if(section.tag === 'inprogress' || section.tag === 'notstarted') {
        if(!tripSwitch) {
          tripSwitch = true
          skipTo.title = section.title
          skipTo.id = section.id
        }
      }
    }
    res.render('./beta-1/tasklist', {
      skipTo: skipTo
    })
  })

  router.post('/beta-1/submit-form', function(req,res) {
    
    //mark a section as "In progress"
    if(req.body.startSection) {
      var currentSectionObject = _.find(req.session.data[version].sections, function(o) {
        return o.id === req.body.startSection
      })
      currentSectionObject.tag = 'inprogress'
    }

    //mark a section as "Completed"
    if(req.body.completeSection) {
      var currentSectionObject = _.find(req.session.data[version].sections, function(o) {
        return o.id === req.body.startSection
      })
      currentSectionObject.tag = 'completed'
    }

    //check for required fields
    var errors = []
    console.log(req.body.this)
    if(req.body.required.length > 0) {
      for(field of req.body.required) {
        if(!req.session.data[version][field] || req.session.data[version][field] === '') {
          errors.push(field)
        }
      }
    }
    if(errors.length === 0) {
      res.redirect(req.body.next)
    }
    else {
      res.render(`.${req.body.this}`, {
          errors: errors  
      })
    }
    
  })

}