const JwtStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require('passport-jwt')
const User = require('../models/User')

const { SECRET } = require('./key')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET,
  algorithms: ['RS256'],
}

const strategy = new JwtStrategy(options, (payload, done) => {
  User.findOne({ _id: payload.sub })
    .then((user) => {
      if (user) return done(null, user)
      return done(null, false)
    })
    .catch((err) => done(err, null))
})

module.exports = (passport) => {
  passport.use(strategy)
}
