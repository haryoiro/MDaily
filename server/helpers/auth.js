// const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../configs')

async function validHash(value, hash) {
  const isValid = await bcrypt.compare(value, hash)
  return isValid
}

const saltRound = 10
async function genHash(value) {
  const salt = await bcrypt.genSalt(saltRound)
  const hash = await bcrypt.hash(value, salt)
  return hash
}

function issueJWT(user) {
  const { _id, username, role } = user
  const expiresIn = '30d'

  const payload = {
    role,
    name: username,
    id: _id,
    iat: Date.now(), // Issued At
  }

  const accessToken = jwt.sign(payload, SECRET, { expiresIn })

  return {
    token: accessToken,
  }
}

module.exports = {
  validHash,
  genHash,
  issueJWT,
}
