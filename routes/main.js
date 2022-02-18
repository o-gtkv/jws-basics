const express = require('express')
const { login, dashboard } = require('../controllers/main')
const authorizationMiddleware = require('../middleware/auth')

const router = express.Router()

router.route('/login')
    .post(login)

router.route('/dashboard')
    .get(authorizationMiddleware, dashboard)

module.exports = router