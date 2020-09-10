const router = require('express').Router()

router.use('/auth', require('./auth.route'))
router.use('/board', require('./board.route'))
router.use('/user', require('./user.route'))
router.use('/admin', require('./admin.route'))

module.exports = router
