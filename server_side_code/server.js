const express = require('express')
const dotenv = require('dotenv')
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
    res.send('Hello World!')
})

app.use(express.static('client_side_code')) // why why why why why does this have to be below app.get :[ it's so UGLYYY

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})