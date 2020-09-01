require('dotenv').config()

const { MONGODB_PASSWORD, MONGODB_USERNAME, MONGODB_TABLE } = process.env

const MONGODB_URI = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0-shard-00-00-xukjb.mongodb.net:27017,cluster0-shard-00-01-xukjb.mongodb.net:27017,cluster0-shard-00-02-xukjb.mongodb.net:27017/${MONGODB_TABLE}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`

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
