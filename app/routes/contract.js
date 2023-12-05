const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('contracts',{title:'Contracts'});
});

module.exports = router;