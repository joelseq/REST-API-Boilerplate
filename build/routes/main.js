'use strict';

//==============================
// Module Dependencies
//==============================
var status = require('http-status');
var express = require('express');
var jwt = require('jsonwebtoken');
var passport = require('passport');

var router = express.Router();

//==============================
// Routes
//==============================
router.get("/dashboard", passport.authenticate('jwt', { session: false }), function (req, res) {
  res.send('It worked! User id is: ' + req.user._id + '.');
});

module.exports = router;