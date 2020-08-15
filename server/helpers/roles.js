// const User = require('../models/User')
// const Role = require('../models/Role')

// async function isAdmin(req, res, next) {
//   const user = await User.findOne({ username: req.body.username })

//   if (!user) res.state(404).json({
//     message: `User not found with username : ${req.body.username}`,
//     success: false,
//   })

//   // Role.find({ '_id': { $in: user.roles })
// }

module.exports = {
  ROLEs: ['USER', 'ADMIN', 'PM'],
}
