const router = require('express').Router()
const { Board, User, Note } = require('../models')

router.post('/reset', async (req, res) => {
  await Board.deleteMany({})
  await User.deleteMany({})
  await Note.deleteMany({})

  res.status(204).end()
})

router
  .route('/all')
  .get(async (req, res) => {
    const returned = await User
      .find({})
      .populate({
        path: 'boards',
        populate: {
          path: 'notes',
        },
      })
    return res.status(200).json(returned)
  })
// router.post('/initialize', async (req, res) => {
//   const ROLEsObject = {
//     role: ""
//   }
// })

module.exports = router
