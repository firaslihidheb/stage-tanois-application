const express = require('express');
const router = express.Router();
const user = require('../models/user')
const Employee = new user();

/* GET users listing. */
router.get('/all', function(req, res, next) {
    Employee.getUsers(req,res);
});

/* GET specific user. */
router.get('/:user_id', function(req, res, next) {
    Employee.getUser(req,res);
});

router.post('/new', function(req, res,) {
    Employee.addUser(req,res);
});

module.exports = router;