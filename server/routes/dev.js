const router = require('express').Router()
const Board = require('../models/Board')
const User = require('../models/User')

router.post('/reset', async (req, res) => {
  await Board.deleteMany({})
  await User.deleteMany({})

  res.status(204).end()
})

// router.post('/initialize', async (req, res) => {
//   const ROLEsObject = {
//     role: ""
//   }
// })

module.exports = router
