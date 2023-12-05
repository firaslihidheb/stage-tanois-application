const express = require('express');
const authenticator = require('./utilities/authenticator');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
require('./utilities/log_attributes');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/user');
const contractsRouter = require('./routes/contract');
const ClientRouter = require('./routes/client');
const invoiceRouter = require('./routes/invoice');
const employeeRouter=require('./routes/employee');
// Creating the web app from express
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Allowing JSON to be parsed as request parameter
app.use(bodyParser.json({type: '*/*'}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(authenticator);

// All the routers defined above
// All path and route middlewares defined below
app.use('/', indexRouter);
app.use('/user' ,usersRouter);
app.use('/contract', contractsRouter);
app.use('/client', ClientRouter);
app.use('/invoice', invoiceRouter);
app.use('/employee',employeeRouter);

module.exports = app;