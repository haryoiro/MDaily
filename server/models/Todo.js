/* eslint-disable no-param-reassign, no-underscore-dangle */
const { Schema, model, Types } = require('mongoose')

const todoSchema = new Schema(
  {
    title: {
      type: String,
      default: 'No Title',
    },
    lines: {
      type: [String],
      default: '',
    },
    // complete: {
    //   type: Boolean,
    //   default: false,
    // },
    user: {
      type: Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: {
      createdAt: 'created',
      updatedAt: 'updated',
    },
  },
)

todoSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  },
})

const Todo = model('Todo', todoSchema)

module.exports = Todo
