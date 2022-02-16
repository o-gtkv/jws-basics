const express = require('express')
const { login, dashboard } = require('../controllers/main')

const router = express.Router()

router
    .post('/login', login)
    .get('/dashboard', dashboard)

module.exports = router