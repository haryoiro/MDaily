/* eslint-disable no-param-reassign, no-underscore-dangle */
const {
  Schema, model,
  // Types
} = require('mongoose')

const userSchema = Schema({
  username: {
    type: String,
    minlength: 5,
    maxlength: 50,
  },
  hash: {
    type: String,
  },
  salt: {
    type: String,
  },
  // role: {
  //     type: Types.ObjectId,
  //     ref: 'Role',
  // },
  // todo: [{
  //     type: Types.ObjectId,
  //     ref: 'Todo',
  // }]
})

userSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  },
})

const User = model('User', userSchema)

module.exports = { User }
