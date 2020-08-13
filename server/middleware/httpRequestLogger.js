const log = require('../helper/decoratedLogger')

const httpRequestLogger = (req, res, next) => {
  log.info('========================')
  log.success('Method:', req.method)
  log.success('Path:', req.path)
  log.success('Body:', req.body)
  log.info('========================')
  next()
}

module.exports = httpRequestLogger
