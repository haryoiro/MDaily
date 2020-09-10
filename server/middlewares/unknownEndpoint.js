const create = require('../helpers/jsonResponseCreator').jsonResponse

const unknownEndpoint = (err, req, res) => res
  .status(404)
  .json(create(404, err.name, err.message))

module.exports = unknownEndpoint
