const unknownEndpoint = (req, res) => {
  res.status(404).json({
    success: false,
    code: 404,
    message: '404 NOT FOUND',
  })
}

module.exports = unknownEndpoint
