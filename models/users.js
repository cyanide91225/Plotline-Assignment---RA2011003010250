const mongoose = require('mongoose')

const User = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: 'customer'}
},
{collection : 'users'}
)

module.exports = mongoose.model('User', User)

