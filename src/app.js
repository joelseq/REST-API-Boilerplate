//==============================
// Module Dependencies
//==============================
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const status = require('http-status');

const app = express();

//==============================
// Express Config
//==============================
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//==============================
// Routes
//==============================
app.get("/", (req,res) => {
  res.status(status.OK).json({home: 'This is the home route'});
});

app.get("/hello", (req,res) => {
  res.status(status.OK).json({hello: 'Hi there'});
});

module.exports = app;
