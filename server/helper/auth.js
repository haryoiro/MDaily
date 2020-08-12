const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../config/key')

function validPassword(password, hash, salt) {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex')
  return hash === hashVerify
}

function genPassword(password) {
  const salt = crypto.randomBytes(32).toString('hex')
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex')

  return {
    salt,
    hash,
  }
}

function issueJWT(user) {
  const { _id } = user
  const expiresIn = '30d'

  const payload = {
    sub: _id,
    iat: Date.now(),
  }

  const signedToken = jwt.sign(payload, SECRET, {
    expiresIn,
    algorithm: 'HS256',
  })

  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  }
}

module.exports = {
  validPassword,
  genPassword,
  issueJWT,
}
