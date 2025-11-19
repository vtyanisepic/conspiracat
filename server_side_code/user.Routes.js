const express = require('express')
const { authenticateToken } = require('./token')
const { signUp, login, getUserData, test } = require('./userController')
const router = express.Router()

router.post('/signup', signUp)
router.post('/login', login)
router.post('/getuserdata', authenticateToken, getUserData)
router.post('/test', authenticateToken, test)

module.exports = router