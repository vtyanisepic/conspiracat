const bcrypt = require('bcrypt')
const User = require('./userModels')
const { generateToken } = require('./token')

exports.signUp = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res
            .status(400)
            .json({ message: 'Username and password are required' })
        }

        const existingUser = await User.findOne({ username })
        if (existingUser) {
            return res
            .status(400)
            .json({ message: 'Username already exists' })
        }

        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = new User({
            username,
            password: hashedPassword
        })
        await newUser.save()

        const token = await generateToken(newUser._id)
        res.cookie('token', token, {
            path: '/', // make the cookie accessible across the entire site
            expires: new Date(Date.now() + 3600000), // 1 hour
            secure: true, // cookie will only be sent over HTTPS
            httpOnly: true, // cannot be accessed via client-side js
            sameSite: 'None'
        })
        console.log('Cookie set successfully')

        return res
        .status(201)
        .json({ message: 'Success' })
    } catch (error) {
        console.log(error.message)
        return res
        .status(500)
        .json({ message: 'Something went wrong, it\'s probably on our end. Sorry!' })
    }
}

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res
            .status(400)
            .json({ message: 'Username and password are required' })
        }

        const existingUser = await User.findOne({ username })
        if (!existingUser) {
            return res
            .status(400)
            .json({ message: 'Invalid username or password' })
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordValid) {
            return res
            .status(400)
            .json({ message: 'Invalid username or password' })
        }

        const token = await generateToken(existingUser._id)
        res.cookie('token', token, {
            // domain: 'localhost',
            path: '/',
            expires: new Date(Date.now() + 3600000),
            secure: true,
            httpOnly: true,
            sameSite: 'None'
        })

        return res
        .status(200)
        .json({ message: 'Success' })
    } catch (error) {
        console.log(error.message)
        return res
        .status(500)
        .json({ message: 'Something went wrong, it\'s probably on our end. Sorry!' })
    }
}

exports.getUserData = async (req, res) => {
    try {
        const id = req.user.id
        const user = await User.findOne({ _id: id }, { password: 0, __v: 0, _id: 0 })
        return res
        .status(200)
        .json(user)
    } catch (error) {
        console.log(error.message)
        return res
        .status(500)
        .json({ message: 'Something went wrong, it\'s probably on our end. Sorry!' })
    }
}

exports.test = async (req, res) => {
    console.log('yes')
    try {
        const id = req.user.id
        await User.findOne({ _id: id }).updateOne({ '$set': { "current.test": [1, 54, "3", "hi"] } })
        console.log('done!')
        return res
        .status(200)
        .json({ message: 'Success' })
    } catch (error) {
        console.log(error.message)
        return res
        .status(500)
        .json({ message: 'Something went wrong, it\'s probably on our end. Sorry!' })
    }
}