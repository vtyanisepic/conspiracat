require('dotenv').config
const jwt = require('jsonwebtoken')

module.exports.generateToken = async (id) => {
    return jwt.sign({ id }, `${process.env.TOKEN_KEY}`, { expiresIn: '1h' })
}

module.exports.authenticateToken = async (req, res, next) => {
    console.log('test')
    const token = req.cookies['token']

    if (!token) {
        return res.redirect('/login')
    }

    jwt.verify(token, `${process.env.TOKEN_KEY}`, (err, user) => {
        if (err) {
            return res
            .status(500)
            .json({ message: 'Something went wrong, it\'s probably on our end. Sorry!' })
        }

        req.user = user
        next()
    })
}