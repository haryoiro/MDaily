const authRouter = require('express').Router()

const { User } = require('../models/User')
const utils = require('../helper/auth')

const {
  authenticatePassport,
  checkDuplicateUserNameOrEmail,
} = require('../middleware/authenticateChecker')

authRouter.get('/protected', authenticatePassport, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'you are authorized.',
  })
})

authRouter.post('/signin', async (req, res) => {
  const { password, email } = req.body
  const currentUser = await User.findOne({ email })
  if (!currentUser) {
    return res.status(404).json({
      success: false,
      auth: false,
      message: 'could not find user',
    })
  }

  const isValid = await utils.validPassword(password, currentUser.hash)
  if (!isValid) {
    return res.status(401).json({
      success: false,
      code: 401,
      auth: false,
      token: null,
      message: 'Invalid Password',
    })
  }

  const tokenObject = await utils.issueJWT(currentUser)
  return res.status(200).json({
    success: true,
    code: 200,
    auth: true,
    token: tokenObject.token,
    expiresIn: tokenObject.expires,
  })
})

authRouter.post('/signup', checkDuplicateUserNameOrEmail, async (req, res) => {
  const { password, username, email } = req.body
  const hash = await utils.genPassword(password)

  const newUser = new User({
    username,
    email,
    hash,
  })

  const savedUser = await newUser.save()
  if (!savedUser) {
    return res.status(400).json({
      success: false,
      message: 'user register error',
    })
  }

  const jwt = utils.issueJWT(savedUser)
  return res.status(200).json({
    success: true,
    user: savedUser,
    token: jwt.token,
    expiresIn: jwt.expires,
  })
})

module.exports = authRouter
