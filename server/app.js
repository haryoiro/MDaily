require('express-async-errors')

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const log = require('./helpers/decoratedLogger')

/* Config */
const { MONGODB_URI, MONGODB_CONFIG } = require('./configs')

/* Middleware */
const {
  unknownEndpoint,
  errorHandler,
  httpRequestLogger,
} = require('./middlewares/index')

const app = express()

/* MONGODB */
log.info('================================================')
// log.action(`[mongo] CONNECTING TO ${MONGODB_URI}`)
log.action('[mongo] CONNECTING TO DATABASE')
log.info('================================================')

mongoose
  .connect(MONGODB_URI, MONGODB_CONFIG)
  .then(() => {
    log.info('================================================')
    log.success('[mongo] CONNECTED TO MONGODB')
    log.info('================================================')
  })
  .catch(({ message }) => log.error('ERROR CONNECTION TO MONGODB:', message))

app.use(helmet())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(mongoSanitize({ replaceWith: '_' }))
app.use(httpRequestLogger)

/* Routes */
app.use('/api/board', require('./routes/board'))
app.use('/api/auth', require('./routes/auth'))

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  app.use('/api/dev', require('./routes/dev'))
}

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = { app }
