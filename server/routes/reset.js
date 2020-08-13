const router = require('express').Router()
const Board = require('../models/Board')
const User = require('../models/User')

router.post('/', async (req, res) => {
  await Board.remove({})
  await User.remove({})

  res.status(204).end()
})

module.exports = router
