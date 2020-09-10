/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken')
const boardRouter = require('express').Router()
const noteRouter = require('./note.route')
const { Board, User, Note } = require('../models')
const { slateInitialValue } = require('../helpers/initialValues')
const { authenticateChecker } = require('../middlewares/authenticateChecker')
const creator = require('../helpers/jsonResponseCreator')
const { SECRET } = require('../configs')

boardRouter.use('/:boardName', noteRouter)

// 所有するすべてのボードを取得
boardRouter.route('/')
  .get(authenticateChecker, async (req, res) => {
    const { auth } = req
    const users = await User.findById(auth.id)
      .select('boards').populate('boards').populate('notes')
      .limit(100)
      .sort()
    return res.send(users)
  })
  // 新規ボード
  .post(authenticateChecker, async (req, res) => {
    const { boardName, isPrivate } = req.body
    const { auth } = req
    if (!boardName) return res.status(400).send(creator(400, 'Title is required'))

    const user = await User.findById(auth.id)
    if (!user) return res.status(404).send(creator(404, 'NOT FOUND'))

    const isTitleExists = await Board.findOne({ boardName, ownerId: user.id })
    if (isTitleExists) return res.status(409).send(creator(409, 'DuplicatedTitle'))

    const newNote = await new Note({
      title: 'Welcome',
      ...slateInitialValue,
    })
    const savedNote = await newNote.save()

    const newBoard = new Board({
      boardName,
      ownerId: auth.id,
      private: isPrivate || true,
      notes: [savedNote.id],
    })
    const savedBoard = await newBoard.save()

    user.boards = [...user.boards, savedBoard.id]
    await user.save()

    return res.status(200).send(savedBoard)
  })

// タイトルからボードを取得
boardRouter
  .route('/:boardName')
  .get(async (req, res) => {
    const { boardName } = req.params
    const returnedBoard = await Board
      .findOne({ boardName })
      .populate('notes')
    if (!returnedBoard) return res.status(404).json(creator(404, 'Board Not Found'))

    if (returnedBoard.private !== null && returnedBoard.private) {
      const authHeader = req.headers.authorization
      const token = authHeader && authHeader.split(' ')[1]
      if (!token) return res.status(401).json(creator(401, 'auth is required'))

      const isAuth = await jwt.verify(token, SECRET)
      // eslint-disable-next-line no-underscore-dangle
      if (!isAuth || String(isAuth.id) !== String(returnedBoard.ownerId)) {
        return res
          .status(403)
          .json(creator(403, 'Forbidden'))
      }
    }
    return res.send(returnedBoard)
  })
  .delete(authenticateChecker, async (req, res) => {
    const { boardName } = req.params
    const { auth } = req
    // 渡されたタイトルのボードが存在するか
    const returnedBoard = await Board
      .findOne({ boardName, ownerId: auth.id })
      .select('ownerId')

    if (String(returnedBoard.ownerId) !== String(auth.id)) {
      return res.status(403).json(creator(403, 'You are not owner for this board'))
    }
    await Board.findByIdAndRemove(String(returnedBoard._id))
    // Userが所有するboardsフィールドから削除したボードのIDを除外
    const currentUser = await User.findById(auth.id)
    currentUser.boards = currentUser.boards.filter((b) => String(b) !== String(returnedBoard._id))
    await currentUser.save()

    return res
      .status(204)
      .json(creator(204, `${boardName} id deleted`))
  })

// ボード設定
// boardRouter.get('/:id/config', [authenticateChecker], async (req, res) => {

// })
// boardRouter.put('/:id/config', [authenticateChecker], async (req, res) => {

// })

module.exports = boardRouter
