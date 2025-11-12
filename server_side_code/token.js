require('dotenv').config
const jwt = require('jsonwebtoken')

module.exports.generateToken = async (id) => {
    return jwt.sign({ id }, `${process.env.TOKEN_KEY}`, { expiresIn: '1h' })
}

module.exports.authenticateToken = async (req, res, next) => {
    console.log('test')
    const token = req.cookies['token']

    if (!token) {
        console.log('test1')
        return next()
    }

    jwt.verify(token, `${process.env.TOKEN_KEY}`, (err, user) => {
        if (err) {
            console.log('test2')
            return next()
        }

        console.log('test3')
        req.user = user
        next()
    })
}