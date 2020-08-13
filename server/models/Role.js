/* eslint-disable no-param-reassign, no-underscore-dangle */
const {
  Schema, model,
  // Types
} = require('mongoose')

const roleSchema = new Schema({
  role: String,
})

// https://grokonez.com/node-js/jwt/node-js-jwt-authentication-mongodb-express-restapis-json-web-token-bcryptjs-mongoose

roleSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  },
})

const Todo = model('Todo', roleSchema)

module.exports = Todo
