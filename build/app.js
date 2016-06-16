'use strict';

//==============================
// Module Dependencies
//==============================
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var status = require('http-status');

var app = express();

//==============================
// Express Config
//==============================
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//==============================
// Routes
//==============================
app.get("/", function (req, res) {
  res.status(status.OK).json({ home: 'This is the home route' });
});

app.get("/hello", function (req, res) {
  res.status(status.OK).json({ hello: 'Hi there' });
});

module.exports = app;