const express = require('express');
const router = express.Router();
const client = require('./../models/client')
const Client = new client();

router.get('/all', function(req, res) {
    Client.getClients(req,res);
});

router.get('/:Client_id', function(req, res) {
    Client.getClient(req,res);
});

router.delete('/:Client_id', function(req, res) {
    Client.deleteClient(req,res);
});

router.post('/new', function(req, res) {
    Client.addClient(req,res);
});

module.exports = router;
