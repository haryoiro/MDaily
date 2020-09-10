const router = require('express').Router()
const { Board, User, Note } = require('../models')

router.post('/reset', async (req, res) => {
  await Board.deleteMany({})
  await User.deleteMany({})
  await Note.deleteMany({})

  res.status(204).end()
})

// router.post('/initialize', async (req, res) => {
//   const ROLEsObject = {
//     role: ""
//   }
// })

module.exports = router
