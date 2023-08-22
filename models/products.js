const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    price: {type: Number, required: true},
    description: {type: String, required: true}
},{collection : 'products'})

module.exports = mongoose.model('Product', productSchema);
 