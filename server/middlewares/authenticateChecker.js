const jwt = require('jsonwebtoken')
const { User } = require('../models/User.model')
const creator = require('../helpers/jsonResponseCreator')
const { SECRET } = require('../configs')

async function checkDuplicateUserNameOrEmail(req, res, next) {
  const { username, email } = req.body
  const message = creator(400, 'Conflict', 'Duplicate Username or Email')

  const isDuplicatedUser = await User.exists({ username })
  if (isDuplicatedUser) return res.status(409).json(message)

  const isDuplicatedEmail = await User.exists({ email })
  if (isDuplicatedEmail) return res.status(409).json(message)

  return next()
}

async function authenticateChecker(req, res, next) {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]
  console.log(authHeader, token)
  if (!token) return res.status(401).json(creator(401, 'auth is required'))

  const isAuth = await jwt.verify(token, SECRET)
  if (!isAuth) {
    return res.status(403).json(creator(403, 'Unauth'))
  }
  req.auth = isAuth
  return next()
}

module.exports = {
  checkDuplicateUserNameOrEmail,
  authenticateChecker,
}
