const passport = require('passport')
const User = require('../models/User')

async function checkDuplicateUserNameOrEmail(req, res, next) {
  const { username, email } = req.body

  const errorMessage = {
    success: false,
    code: 400,
    auth: false,
    token: null,
    message: 'Duplicate Username or Email ',
  }

  const isDuplicatedUser = await User.findOne({ username })
  if (isDuplicatedUser) return res.status(400).json(errorMessage)

  const isDuplicatedEmail = await User.findOne({ email })
  if (isDuplicatedEmail) return res.status(400).json(errorMessage)

  return next()
}

const authenticatePassport = passport.authenticate('jwt', { session: false })

module.exports = {
  checkDuplicateUserNameOrEmail,
  authenticatePassport,
}
