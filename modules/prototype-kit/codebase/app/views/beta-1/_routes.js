module.exports = function (router) {
  const version = 'beta-1';

  router.use(function(req,res,next) {
    req.session.data['version'] = version
    return next()
  })

  router.post('/beta-1/submit-form', function(req,res) {
    console.log(req.body, req.session.data)
    if(req.body.startSession) {

    }
    res.redirect(req.body.next)
  })

}