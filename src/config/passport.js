//==============================
// Module Dependencies
//==============================
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
require('dotenv').config();

// Setup Strategies
module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = process.env.SECRET;

  // Local-token auth strategy
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({id: jwt_payload.id}, (err, user) => {
      if(err) {
        return done(err, false);
      }
      if(user) {
        done(null, user);
      } else {
        done(null, false);
      }
    });
  }));
};
