const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const cookieParser = require('cookie-parser')
const userRouter = require('./user.Routes')
const { connectDB } = require('./database')
const { authenticateToken } = require('./token')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

connectDB()

app.use(express.json())
app.use(cookieParser())
app.use('/api/user', userRouter)

app.get('/', authenticateToken, (req, res) => {
    if (!req.user) return res.redirect('/login')
    res.sendFile(path.resolve(__dirname + '/../client_side_code/index.html'))
})

app.get('/login', authenticateToken, (req, res) => {
    if (req.user) return res.redirect('/')
    res.sendFile(path.resolve(__dirname + '/../client_side_code/login/index.html'))
})

app.get('/signup', authenticateToken, (req, res) => {
    if (req.user) return res.redirect('/')
    res.sendFile(path.resolve(__dirname + '/../client_side_code/signup/index.html'))
})

app.use(express.static('client_side_code/static'))
app.use(express.static('images')) 

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})