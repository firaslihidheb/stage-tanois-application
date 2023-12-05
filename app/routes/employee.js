const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('employees',{title:'employees'});
});
//router.get('/register', function(req, res, next) {
 //   res.render('register',{title:'Employee - Register'});
 // });

module.exports = router;