const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, required: true},
    level: { type: Number, default: 1 },
    stats: {
        mettle: { type: Number, default: 1 },
        panache: { type: Number, default: 1 },
        sagacity: { type: Number, default: 1 }
    },
    paper: { type: Number, default: 0 },
    inventory: {
        type: Map,
        of: Number,
        default: {}
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User