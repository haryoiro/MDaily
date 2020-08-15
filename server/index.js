const http = require('http')

const { app } = require('./app')
const { PORT } = require('./configs')
const log = require('./helpers/decoratedLogger')

const server = http.createServer(app)

server.listen(PORT, () => {
  log.info('------------------------------------------------')
  log.success(`[server] SERVER RUNNING ON PORT: ${PORT}`)
  log.info('------------------------------------------------')
})
