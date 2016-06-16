//==============================
// Module Dependencies
//==============================
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const status = require('http-status');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const app = express();

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
app.get("/", (req,res) => {
  res.sendFile('public/index.html');
});

app.get("/ping", (req,res) => {
  res.status(status.OK).json({pong: 'Hi there'});
});

module.exports = app;
