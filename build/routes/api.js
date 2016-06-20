'use strict';

//==============================
// Module Dependencies
//==============================
var status = require('http-status');
var express = require('express');
var jwt = require('jsonwebtoken');

var router = express.Router();
var User = require('../models/user');

require('dotenv').config();

//==============================
// Routes
//==============================

// Register new users
router.post('/register', function (req, res) {
  if (!req.body.email || !req.body.password) {
    res.json({ success: false, message: 'Please enter email and password.' });
  } else {
    //Create new User
    var newUser = new User({
      email: req.body.email,
      password: req.body.password
    });

    //Save the User
    newUser.save(function (err) {
      if (err) {
        return res.json({ success: false, message: 'Email already exists.' });
      }
      res.json({ success: true, message: 'User successfully created.' });
    });
  }
});

// Authenticate users
router.post('/authenticate', function (req, res) {
  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      throw err;
    }
    // if user was not found
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      // check if passwords match
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // Create JWT
          var token = jwt.sign(user, process.env.SECRET, {
            expiresIn: '7d' // string literal translated to seconds
          });
          res.json({ success: true, token: 'JWT ' + token });
        } else {
          res.json({ success: false, message: 'Passwords didn\'t match' });
        }
      });
    }
  });
});

module.exports = router;