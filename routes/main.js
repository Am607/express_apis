const router = require('express').Router()
  router.get('/' ,async (req, res) => {

    res.send('hey iam here');
  })



module.exports = router