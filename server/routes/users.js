const userRouter = require('express').Router()
const passport = require('passport')
const { User } = require('../models/User')
const utils = require('../helper/auth')

const authMid = passport.authenticate('jwt', { session: false })

// JWTとPassportによって認証されるか確かめられる
userRouter.get('/protected', authMid, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'you are authorized.',
  })
})

userRouter.post('/login', async (req, res) => {
  const { password, username } = req.body
  const currentUser = await User.findOne({ username })
  if (!currentUser) {
    return res.status(401).json({
      success: false,
      message: 'could not find user',
    })
  }

  const isValid = await utils.validPassword(
    password,
    currentUser.hash,
    currentUser.salt,
  )
  if (isValid) {
    const tokenObject = await utils.issueJWT(currentUser)
    return res.status(200).json({
      success: true,
      token: tokenObject.token,
      expiresIn: tokenObject.expires,
    })
  }

  return res.status(401).json({
    success: false,
    message: 'you entered the wrong password',
  })
})

userRouter.post('/register', async (req, res) => {
  const { password, username } = req.body
  const saltHash = await utils.genPassword(password)

  const { salt } = saltHash
  const { hash } = saltHash

  const newUser = new User({
    username,
    hash,
    salt,
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

module.exports = userRouter
