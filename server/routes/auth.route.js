const authRouter = require('express').Router()
const { User } = require('../models')
const { genHash, validHash, issueJWT } = require('../helpers/auth')

const {
  checkDuplicateUserNameOrEmail,
  authenticateChecker,
} = require('../middlewares/authenticateChecker')
/* creator is Json response Generator */
const creator = require('../helpers/jsonResponseCreator')

authRouter
  .route('/protected')
  .get(authenticateChecker, async (req, res) => {
    console.log('protect')
    return res.status(200).json({
      success: true,
      message: 'you are authorized.',
    })
  })

authRouter
  .route('/signin')
  .post(async (req, res) => {
    const { password, username } = req.body

    const currentUser = await User.findOne({ username })
    if (!currentUser) {
      return res
        .status(400)
        .send(creator(400, 'AuthenticateError', 'Invalid Password or Email'))
    }

    const isValid = await validHash(password, currentUser.hash)
    if (!isValid) {
      return res
        .status(400)
        .send(creator(400, 'AuthenticateError', 'Invalid Password or Email'))
    }

    const { token } = await issueJWT(currentUser)
    return res.status(200).json({
      success: true,
      code: 200,
      auth: true,
      token,
    })
  })

authRouter.post('/register', checkDuplicateUserNameOrEmail, async (req, res) => {
  const { password, username, email } = req.body

  const hash = await genHash(password)
  const emailHash = await genHash(email)
  const newUser = new User({
    username,
    email: emailHash,
    hash,
  })

  const savedUser = await newUser.save()
  const jwt = issueJWT(savedUser)
  return res.status(200).json({
    success: true,
    user: savedUser,
    token: jwt.token,
    expiresIn: jwt.expires,
  })
})

module.exports = authRouter
