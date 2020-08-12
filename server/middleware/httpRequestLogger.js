const logger = require('../helper/decoratedLogger')

const httpRequestLogger = (req, res, next) => {
  logger.info('========================')
  logger.success('Method:', req.method)
  logger.success('Path:', req.path)
  logger.success('Body:', req.body)
  logger.info('========================')
  next()
}

module.exports = httpRequestLogger
