/* eslint-disable no-param-reassign, no-underscore-dangle */
const { Schema, model, Types} = require('mongoose')

const noteSchema = new Schema(
  {
    title: {
      type: String,
    },
    contents: {
      type: Schema.Types.Mixed,
    },
    boardId: {
      type: Types.ObjectId,
      ref: 'Board',
    },
    thumbnail: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: {
      created: 'created',
      updated: 'updated',
    },
  },
)

noteSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  },
})

const Note = model('Note', noteSchema)

module.exports = { Note }
