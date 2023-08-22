const express = require("express");
const router = express.Router();

const User = require('../../models/users')
const Cart = require('../../models/cart')

router.get('/', async (req,res) => {
    const user = await User.findOne({
        email: req.body.email,
    })
    const cart = await Cart.findOne({user_id: user._id})
    if (cart.products.length != 0 || cart.services.length != 0){
        const products = cart.products
        const services = cart.services
        const products_total = products.reduce((total, product) => 
            total + (product.quantity*(product.product.price + (product.tax == "12%" ? product.product.price*0.12 : product.tax == "18%" ? product.product.price*0.18 : 200)))
        , 0)
        const services_total = services.reduce((total, service) => 
            total + (service.quantity*(service.service.price + (service.tax == "10%" ? service.service.price*0.1 : service.tax == "15%" ? service.service.price*0.15 : 100) ))
        , 0)
        console.log(products_total, services_total)
        const total = products_total + services_total
        res.json({products: products, services: services, products_total: products_total, services_total: services_total, total: total})
    } else {    
        res.send('Cart is empty')
    } 
})

module.exports = router;