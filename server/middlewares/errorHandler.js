const create = require('../helpers/jsonResponseCreator')

const errorHandler = (err, req, res, next) => {
  const { name, message } = err
  if (name === 'CastError' && err.kind === 'ObjectId') {
    return res
      .status(400)
      .json(create(400, name, message))
  }
  if (name === 'ReferenceError') {
    console.error(name, message)
    return res
      .status(500)
      .json(create(500, name, message))
  }
  if (name === 'ValidationError') {
    return res
      .status(400)
      .json(create(400, name, message))
  }
  if (name === 'JsonWebTokenError') {
    return res
      .status(401)
      .json(create(401, name, message))
  }
  if (name === 'MongoError') {
    if (err.code === 11000) {
      return res
        .status(409)
        .json(create(409, name, message))
    }
  }
  return next(err)
}

module.exports = errorHandler
