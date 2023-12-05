const express = require('express');
const router = express.Router();
const contract = require('./../models/contract')
const Contract = new contract();

/* GET contracts listing. */
router.get('/all', function(req, res, next) {
    Contract.getContracts(req,res);
});

/* GET specific contract. */
router.get('/:contract_id', function(req, res, next) {
    Contract.getContract(req,res);
});

router.post('/new', function(req, res, next) {
    Contract.addContract(req,res);
});

module.exports = router;
