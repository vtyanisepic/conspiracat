require('dotenv').config // huh
const mongoose = require('mongoose')

exports.connectDB = async () => {
    console.log(process.env.MONGODB_PASS, process.env.TOKEN_KEY)
    try {
        await mongoose.connect(`mongodb+srv://vtyan5291:${process.env.MONGODB_PASS}@conspiracat.yz61xnb.mongodb.net/?appName=conspiracat`)
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.log('MongoDB connection failed:', error)
    }
}