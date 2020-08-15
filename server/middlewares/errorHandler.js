const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).send({ success: false, message: 'malformatted id' })
  }
  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: err.message })
  }
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ success: false, message: 'invalid token' })
  }
  if (err.name === 'MongoError' && err.code === 11000) {
    return res
      .status(409)
      .json({ success: false, message: 'value is already exists' })
  }
  console.error(err)
  return next(err)
}

module.exports = errorHandler
