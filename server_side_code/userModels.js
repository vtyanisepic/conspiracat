const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true},
    password: { type: String, required: true},
    current: { 
        type: Map,
        of: [String],
        get: v => {
            let temp = []
            v.forEach((item) => {
                isNaN(item) ? temp.push(item) : temp.push(Number(item))
            })
            return temp
        },
        set: v => {
            let temp = []
            v.forEach((item) => {
                temp.push(String(item))
            })
            return temp
        },
        default: {}
    },
    level: { type: Number, default: 1 },
    hp: {
        max: { type: Number, default: 0 },
        current: { type: Number, default: 0 }
    },
    mp: {
        max: { type: Number, default: 0 },
        current: { type: Number, default: 0 }
    },
    stats: {
        mettle: { 
            main: { type: Number, default: 1 },
            sub: { type: Number, default: 1 }
        },
        panache: {
            main: { type: Number, default: 1 },
            sub: { type: Number, default: 1 }
        },
        sagacity: {
            main: { type: Number, default: 1 },
            sub: { type: Number, default: 1 }
        }
    },
    paper: { type: Number, default: 0 },
    inventory: {
        type: Map,
        of: Number,
        default: {}
    },
    quests: {
        type: Map,
        of: [Number],
        default: {}
    },
    completed_quests: { type: [String], default: [] }
})

const User = mongoose.model('User', userSchema)

module.exports = User