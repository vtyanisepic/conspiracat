const express = require('express')
const { authenticateToken } = require('./token')
const { signUp, login, getUserData } = require('./userController')
const router = express.Router()

router.post('/signup', signUp)
router.post('/login', login)
router.post('/getuserdata', authenticateToken, getUserData)

module.exports = router