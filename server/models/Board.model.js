/* eslint-disable no-param-reassign, no-underscore-dangle */
const { Schema, model, Types } = require('mongoose')

const boardSchema = new Schema(
  {
    title: {
      type: String,
      minlength: 5,
      maxlength: 20,
    },
    notes: [
      {
        type: Types.ObjectId,
        ref: 'Note',
        default: [],
      },
    ],
    ownerId: {
      type: Types.ObjectId,
      ref: 'User',
    },
    private: {
      type: Boolean,
      default: true,
    },
    theme: {
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

boardSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  },
})

const Board = model('Board', boardSchema)

module.exports = { Board }
