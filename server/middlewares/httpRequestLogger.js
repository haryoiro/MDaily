const log = require('../helpers/decoratedLogger')

const httpRequestLogger = (req, res, next) => {
  const { params, method, path, body } = req
  log.info('================================================ ')
  log.success('Params:', params)
  log.success('Method:', method)
  log.success('Path  :', path)
  log.success('Body  :', body)
  log.info('================================================ ')
  next()
}

module.exports = httpRequestLogger
