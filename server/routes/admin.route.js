const adminRouter = require('express').Router()
const { Board, User, Note } = require('../models')

adminRouter
  .route('/users')
  .get(async (req, res) => {
    const allUser = await User.find({})
    res.send(allUser)
  })

adminRouter
  .route('/role')
  .get(async (req, res) => {

  })

module.exports = adminRouter
