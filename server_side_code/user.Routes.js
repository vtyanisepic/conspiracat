const express = require('express')
const { authenticateToken } = require('./token')
const { signUp, login, getUserData, adventure } = require('./userController')
const router = express.Router()

router.post('/signup', signUp)
router.post('/login', login)
router.post('/getuserdata', authenticateToken, getUserData)
router.post('/adventure', authenticateToken, adventure)

module.exports = router