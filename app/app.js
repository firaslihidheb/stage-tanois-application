const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const exphbs  = require('express-handlebars');
const cors = require('cors');
require('dotenv').config();

const hbs = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        api_url: function () { return process.env.API_URL +":" + 3000; }
    }
});

const usersRouter = require('./routes/users');
const contractsRouter = require('./routes/contract');
const ClientRouter = require('./routes/client');
const invoiceRouter = require('./routes/invoice');
const viewRouter = require('./routes/view');
const downloadRouter = require('./routes/download');
const employeeRouter=require('./routes/employee');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: "43669a0c-22ba-4042-ad5a-2997b6dc8cee",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 86400 }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use('/static', express.static(path.join(__dirname, 'public')))
app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


app.use('/', usersRouter);
app.use('/contracts', contractsRouter);
app.use('/clients', ClientRouter);
app.use('/download', downloadRouter);
app.use('/invoices', invoiceRouter);
app.use('/view', viewRouter);
app.use('/employees',employeeRouter);

module.exports = app;
