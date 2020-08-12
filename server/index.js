const http = require('http')

const { app } = require('./app')
const { PORT } = require('./config/key')
const logger = require('./helper/decoratedLogger')

const server = http.createServer(app)

server.listen(PORT, () => {
  logger.info('------------------------------------------------')
  logger.success(`SERVER RUNNING ON PORT: ${PORT}`)
  logger.info('------------------------------------------------')
})
