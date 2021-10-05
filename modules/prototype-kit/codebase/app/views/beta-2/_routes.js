const _ = require('lodash')
const validate = require("validate.js")
const version = require("./_version.js")

module.exports = function (router) {

  router.use(function(req,res,next) {
    req.session.data['version'] = version
    console.log('beta-2')
    return next()
  })

  router.get(`/${version}/tasklist`, function(req,res) {

    //catch completed section trigger
    if(req.query.complete != undefined) {
      var currentSectionObject = _.find(req.session.data[version].sections, function(o) {
        return o.id === req.query.complete
      })
      currentSectionObject.tag = 'completed'
    }

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

    res.render(`./${version}/tasklist`, {
      skipTo: skipTo
    })
  })

  router.post(`/${version}/submit-form`, function(req,res) {
    
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
    // var errors = []
    // console.log(req.body.this)
    // if(req.body.required != undefined && req.body.required.length > 0) {
    //   for(field of req.body.required) {
    //     if(req.session.data[version][field] === undefined || req.session.data[version][field] === null || req.session.data[version][field] === '') {
    //       errors.push(field)
    //     }
    //   }
    // }
    // if(errors.length === 0) {
    //   res.redirect(req.body.next)
    // }
    // else {
    //   res.render(`.${req.body.this}`, {
    //       errors: errors  
    //   })
    // }

    //branching
    if(req.body.branch) {
      var goNext = req.body.next['*']
      for(next in req.body.next) {
        if(next === req.body[req.body.branch]) {
          goNext = req.body.next[next]
        }
      }
      res.redirect(goNext)
    }
    else {
      res.redirect(req.body.next)
    }

    
    
  })

}