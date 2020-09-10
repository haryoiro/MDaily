const userRouter = require('express').Router()

userRouter
  .route('/:username')
  .get((req, res) => {
    const { username } = req.params
    return res.send(username)
  })

module.exports = userRouter
