//==============================
// Module Dependencies
//==============================
const status = require('http-status');
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const router = express.Router();


//==============================
// Routes
//==============================
router.get("/dashboard", passport.authenticate('jwt', { session: false }), (req,res) => {
  res.send(`It worked! User id is: ${req.user._id}.`);
});

module.exports = router;
