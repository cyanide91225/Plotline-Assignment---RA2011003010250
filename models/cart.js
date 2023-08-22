const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema({
    product: {
        _id: {type: String, required: true},
        price: {type: Number, required: true},
        description: {type: String, required: true}
    },
    quantity: {type: Number, required: true},
    tax: {type: String, required: true},
},{_id: false})

const servicesSchema = new mongoose.Schema({
    service: {
        _id: {type: String, required: true},
        price: {type: Number, required: true},
        description: {type: String, required: true}
    },
    quantity: {type: Number, required: true},
    tax: {type: String, required: true},
},{_id: false})

const cartSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    products: [productsSchema],
    services: [servicesSchema]
},{collection : 'cart'})

module.exports = mongoose.model('Cart', cartSchema);