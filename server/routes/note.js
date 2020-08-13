const todoRouter = require('express').Router()
const Todo = require('../models/Board')

todoRouter.get('/', async (req, res) => {
  const allTodo = await Todo.find({})
  res.json(allTodo)
})

todoRouter.post('/', async (req, res) => {
  const { body } = req
  const { title, lines, complete } = body
  if (!(title || lines || complete)) {
    // TODO: MESSAGE
    return res.status(400)
  }

  if (await Todo.exists({ title })) {
    // TODO: MESSAGE
    return res.status(409)
  }

  const newTodo = await new Todo({
    title,
    lines,
  })

  const savedTodo = await newTodo.save()
  // TODO: MESSAGE, STATUS
  return res.json(savedTodo.toJSON())
})

todoRouter.get('/:id', async (req, res) => {
  const { id } = req.params

  const todo = await Todo.findById(id)
  if (!todo) {
    return res
      .status(404)
      .json({ success: false, message: `${id} is not exists` })
  }

  return res.json(todo.toJSON())
})

todoRouter.put('/:id', async (req, res) => {
  const { body } = req
  const { id } = body

  const todo = { ...body }
  const message = await Todo.findByIdAndUpdate(id, todo, { new: true })
  // TODO: 404ステータス
  return res.status(204).json({ success: true, message })
})

todoRouter.delete('/:id', async (req, res) => {
  const { id } = req.params

  const message = await Todo.findByIdAndRemove(id)
  // TODO: 失敗字ステータス
  return res.status(204).json({ success: true, message })
})

module.exports = todoRouter
