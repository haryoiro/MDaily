require('express-async-errors')

const express = require('express')
const path = require('path')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const logger = require('./helper/decoratedLogger')

/* Config */
const { MONGODB_URI, MONGODB_CONFIG } = require('./config/key')

/* Middleware */
const {
  unknownEndpoint,
  errorHandler,
  httpRequestLogger,
} = require('./middleware/index')

const app = express()

/* MONGODB */
logger.info('================================================')
// logger.action(`CONNECTING TO ${MONGODB_URI}`)
logger.action('CONNECTING TO MONGO URI')
logger.info('================================================')

mongoose
  .connect(MONGODB_URI, MONGODB_CONFIG)
  .then(() => {
    logger.info('================================================')
    logger.success('CONNECTED TO MONGODB')
    logger.info('================================================')
  })
  .catch((error) => logger.error('ERROR CONNECTION TO MONGODB:', error.message))

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(httpRequestLogger)

/* Routes */
app.use('/api/v1/todo', require('./routes/todo'))
app.use('/api/v1/user', require('./routes/users'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
  })
}

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = { app }
