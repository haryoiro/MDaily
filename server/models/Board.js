/* eslint-disable no-param-reassign, no-underscore-dangle */
const { Schema, model, Types } = require('mongoose')

const boardSchema = new Schema(
  {
    title: {
      type: String,
    },
    contents: {
      type: Schema.Types.Mixed,

    },
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

boardSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  },
})

const Board = model('Board', boardSchema)

module.exports = Board
