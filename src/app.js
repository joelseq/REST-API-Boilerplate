//==============================
// Module Dependencies
//==============================
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const status = require('http-status');
const passport = require('passport');

const app = express();

// Get environment variables
require('dotenv').config();

const User = require('./models/user');

//==============================
// Express Config
//==============================
app.use(logger('dev'));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

mongoose.connect(process.env.DB_URI);

require('./config/passport')(passport);

require('./routes')(app);

module.exports = app;
