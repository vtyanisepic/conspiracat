require('dotenv').config // huh
const mongoose = require('mongoose')
const User = require('./userModels')

exports.connectDB = async () => {
    console.log(process.env.MONGODB_PASS, process.env.TOKEN_KEY)
    try {
        await mongoose.connect(`mongodb+srv://vtyan5291:${process.env.MONGODB_PASS}@conspiracat.yz61xnb.mongodb.net/?appName=conspiracat`)
        console.log('MongoDB connected successfully')
        await User.updateMany(
            { paper: { $exists: false } },
            { $set: { paper: 0 } }
        )
    } catch (error) {
        console.log('MongoDB connection failed:', error)
    }
}