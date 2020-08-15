// const crypto = require('crypto')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { SECRET } = require('../configs')

async function validPassword(password, hash) {
  const passwordIsValid = await bcrypt.compare(password, hash)
  return passwordIsValid
}

const saltRound = 10
async function genPassword(password) {
  const salt = await bcrypt.genSalt(saltRound)
  const hash = await bcrypt.hash(password, salt)
  return hash
}

function issueJWT(user) {
  const { _id } = user
  const expiresIn = '30d'

  const payload = {
    sub: _id,
    iat: Date.now(), // Issued At
  }

  const signedToken = jwt.sign(payload, SECRET, { expiresIn })

  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  }
}

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"]
//   const token = authHeader && authHeader.split(' ')[1]
//   if (token == null) {
//     return res.status(401).json({
//       success: false,
//       code: 401,
//       message: 'authError',
//     })
//   }

//   jwt.verify(token, SECRET, (err, user) => {
//     if (err) {
//       return res.status(403).json({
//         success: false,
//         code: 403,
//       })
//     }
//     req.user = user
//     next()
//   })
// }

module.exports = {
  validPassword,
  genPassword,
  issueJWT,
}
