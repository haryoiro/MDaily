const router = require('express').Router()
const Board = require('../models/Board')
const User = require('../models/User')

router.post('/reset', async (req, res) => {
  await Board.remove({})
  await User.remove({})

  res.status(204).end()
})

router.post('/initialize', async (req, res) => {
  const ROLEsObject = {
    role: ""
  }
})

module.exports = router
