require('dotenv').config()

const { MONGODB_URI } = process.env

const MONGODB_CONFIG = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}

const PORT = process.env.PORT ? process.env.PORT : 5000

const { SECRET } = process.env

module.exports = {
  MONGODB_URI,
  MONGODB_CONFIG,
  PORT,
  SECRET,
}
