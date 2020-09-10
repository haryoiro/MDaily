const noteRouter = require('express').Router({ mergeParams: true })
const { Note } = require('../models')
const { slateInitialValue } = require('../helpers/initialValues')
const creator = require('../helpers/jsonResponseCreator')

noteRouter.route('/')
  .post(async (req, res) => {
    const newNote = await new Note({
      ...slateInitialValue,
    })

    const savedNote = await newNote.save()

    return res.json(savedNote.toJSON())
  })

noteRouter
  .route('/id')
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

noteRouter.put('/:id', async (req, res) => {
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

noteRouter.delete('/:id', async (req, res) => {
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
