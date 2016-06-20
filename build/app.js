'use strict';

//==============================
// Module Dependencies
//==============================
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var status = require('http-status');
var passport = require('passport');

var app = express();

// Get environment variables
require('dotenv').config();

var User = require('./models/user');

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