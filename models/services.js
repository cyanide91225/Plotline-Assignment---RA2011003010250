const mongoose = require('mongoose')

const Service = new mongoose.Schema({
    price: {type: Number, required: true},
    description: {type: String, required: true}
},{collection : 'services'}

)

module.exports = mongoose.model('Service', Service)

