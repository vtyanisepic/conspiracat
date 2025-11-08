const express = require('express')
const { authenticateToken } = require('./token')
const { signUp, login } = require('./userController')
const router = express.Router()

router.post('/signup', signUp)
router.post('/login', login)

module.exports = router