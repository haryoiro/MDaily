const http = require('http')

const { app } = require('./app')
const { PORT } = require('./config/key')
const log = require('./helper/decoratedLogger')

const server = http.createServer(app)

server.listen(PORT, () => {
  log.info('------------------------------------------------')
  log.success(`SERVER RUNNING ON PORT: ${PORT}`)
  log.info('------------------------------------------------')
})
