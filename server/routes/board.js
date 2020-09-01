const dayjs = require('dayjs')
const boardRouter = require('express').Router()
const Board = require('../models/Board')

boardRouter.get('/', async (req, res) => {
  const allBoard = await Board.find({})
  res.json(allBoard)
})

boardRouter.post('/', async (req, res) => {
  const today = dayjs().locale('ja').format('YYYY-MM-DD hh:mm')
  // if (!(title || contents)) {
  //   // board: MESSAGE
  //   return res.status(400)
  // }

  if (await Board.exists({ title: today })) {
    // board: MESSAGE
    return res.status(409)
  }

  const initialContent = {
    title: today,
    contents: {
      text:
        '[{"type":"paragraph","children":[{"text":""}]},{"type":"new-line","children":[{"text":""}]}]',
    },
  }

  const newBoard = await new Board({
    ...initialContent,
  })

  const savedBoard = await newBoard.save()
  // board: MESSAGE, STATUS
  return res.json(savedBoard.toJSON())
})

boardRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  const board = await Board.findById(id)
  if (!board) {
    return res
      .status(404)
      .json({ success: false, message: `${id} is not exists` })
  }

  return res.json(board.toJSON())
})

boardRouter.put('/:id', async (req, res) => {
  const { body } = req
  const { id } = req.params
  if (!body) {
    return res.status(400)
  }
  console.log(id)
  const board = await Board.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        contents: {
          text: body.text,
        },
      },
    }
  )
  // mongooseの使用上、save()関数を実行しないと__vが加算されないので
  // この行は残しておくこと。
  // issue: https://github.com/Automattic/mongoose/issues/6994
  // プラグインによっての解決も可能。
  await board.save()
  // board: 404ステータス
  return res.status(204).json(board.toJSON())
})

boardRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  const message = await Board.findByIdAndRemove(id)
  // board: 失敗字ステータス
  return res.status(204).json({ success: true, message })
})

module.exports = boardRouter
