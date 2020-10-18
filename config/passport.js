const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const { UserModel, getUserById } = require('../models/User')
const { AdminModel } = require('../models/Admin')
const config = require('./database')

module.exports = (userType, passport) => {
  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
  opts.secretOrKey = config.secret
  
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

    if(userType === 'users') {
      UserModel.findById(jwt_payload.data._id, function(err, user) {
        if(err) {
          console.log(err)
          return done(err, false)
        }
        if(user) {
          return done(null, user)
        }
        else {
          return done(null, false)
        }
      })
    }
    else if(userType === 'admins') {
      AdminModel.findById(jwt_payload.data._id, function(err, user) {
        if(err) {
          console.log(err)
          return done(err, false)
        }
        if(user) {
          return done(null, user)
        }
        else {
          return done(null, false)
        }
      })
    }

  })
  )
} 


