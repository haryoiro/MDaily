/* eslint-disable no-param-reassign, no-underscore-dangle */
const { Schema, model, Types } = require('mongoose')

const userSchema = Schema({
  username: {
    type: String,
    minlength: 5,
    maxlength: 50,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
  },
  hash: {
    type: String,
  },
  thumbnail: {
    type: String,
    default: '',
  },
  roles: [
    {
      type: Types.ObjectId,
      ref: 'Role',
      default: [],
    },
  ],
  boards: [
    {
      type: Types.ObjectId,
      ref: 'Board',
      default: [],
    },
  ],
})

userSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    delete ret.hash
  },
})

const User = model('User', userSchema)

module.exports = { User }
