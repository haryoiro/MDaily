const noteRouter = require('express').Router({ mergeParams: true })
const { Note } = require('../models')
const { slateInitialValue } = require('../helpers/initialValues')
const { authenticateChecker } = require('../middlewares/authenticateChecker')
const creator = require('../helpers/jsonResponseCreator')
const { Board } = require('../models/Board.model')

// 新規ノートを作成
noteRouter.route('/')
  .post(authenticateChecker, async (req, res) => {
    const { boardName } = req.params
    const { auth } = req

    const returnedBoard = await Board.findOne({ boardName, ownerId: auth.id }).select('notes')
    if (!returnedBoard) {
      return res
        .status(404)
        .json(creator(404, 'Board Not Found'))
    }

    const newNote = await new Note({
      ...slateInitialValue,
    })

    const savedNote = await newNote.save()
    // eslint-disable-next-line no-underscore-dangle
    returnedBoard.notes = [...returnedBoard.notes, savedNote._id]
    await returnedBoard.save()

    return res.json(savedNote)
  })

noteRouter
  .route('/:id')
  .get(async (req, res) => {
    const { id } = req.params

    const note = await Note.findById(id)
    if (!note) {
      return res
        .status(404)
        .send(creator(404, `Note id:${id} is not found`))
    }

    return res.json(note.toJSON())
  })
  .put(async (req, res) => {
    const { body } = req
    const { id } = req.params
    if (!body) {
      return res.status(400)
    }
    const note = await Note.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          contents: {
            text: body.text,
          },
        },
      },
    )
    // mongooseの使用上、save()関数を実行しないと__vが加算されないので
    // この行は残しておくこと。
    // issue: https://github.com/Automattic/mongoose/issues/6994
    // プラグインによっての解決も可能。
    await note.save()
    // note: 404ステータス
    return res.status(204).json(note.toJSON())
  })
  .delete(async (req, res) => {
    const { id } = req.params

    const message = await Note.findByIdAndRemove(id)
    if (!message) {
      return res
        .status(404)
        .send(creator(404, `Note id:${id} is not found`))
    }
    return res.status(204).json({ success: true, message })
  })

module.exports = noteRouter
