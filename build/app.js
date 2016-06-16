'use strict';

//==============================
// Module Dependencies
//==============================
var express = require('express');
var logger = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var status = require('http-status');
var jwt = require('jsonwebtoken');
var passport = require('passport');

var app = express();

//==============================
// Express Config
//==============================
app.use(logger('dev'));
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//==============================
// Routes
//==============================
app.get("/", function (req, res) {
  res.sendFile('public/index.html');
});

app.get("/ping", function (req, res) {
  res.status(status.OK).json({ pong: 'Hi there' });
});

module.exports = app;