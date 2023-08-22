const express = require("express");
const router = express.Router();

const User = require('../../models/users')
const Cart = require('../../models/cart');
const Product = require('../../models/products')
const Service = require('../../models/services')

router.get('/', async (req,res) => {
    const user = await User.findOne({
        email: req.body.email,
    })
    const cart = await Cart.find({
        user_id: user._id
    });
    return res.json(cart);
})

router.get('/add', async (req,res) => {
    const user = await User.findOne({
        email: req.body.email,
    })
    if (req.body.product_id){
        const product = await Product.findOne({_id: req.body.product_id})
        console.log(product.price)
        const cart = await Cart.findOne({user_id: user._id})
        if (product){
            if (cart){
                if (cart.products.find(p => p.product._id == product._id)){
                    await Cart.findOneAndUpdate(
                            {
                                user_id: user._id,
                            },
                            {
                                products: cart.products.map(p => {
                                    if (p.product._id == product._id){
                                        p.quantity += 1
                                    }
                                    return p
                                })
                            }
                        )
                        res.send('Product updated in cart')
                } else {
                    const tax = 1000< product.price && product.price < 5000 ? "12%" : product.price > 5000 ? "18%" : "Flat 200"
                    await Cart.findOneAndUpdate(
                        {user_id: user._id},
                        {$push: {products: {product: product, quantity: 1,tax: tax}}}
                    )
                    res.send('Product added to cart')
                }
            } else {
                console.log(product.price> 5000)
                const tax = 1000 < product.price && product.price < 5000 ? "12%" : product.price > 5000 ? "18%" : "Flat 200"
                await Cart.create({
                    user_id: user._id,
                    products: [{
                        product: product,
                        quantity: 1,
                        tax: tax
                    }],
                    services: []
                })
                res.json({status: 'ok', message: 'User added to cart'})
            }
        }
    } else if (req.body.service_id){
        const service = await Service.findOne({_id: req.body.service_id})
        const cart = await Cart.findOne({user_id: user._id})
        if (service){
            if (cart){
                if (cart.services.find(s => s.service._id == service._id)){
                    await Cart.findOneAndUpdate(
                            {
                                user_id: user._id,
                            },
                            {
                                services: cart.services.map(s => {
                                    if (s.service._id == service._id){
                                        s.quantity += 1
                                    }
                                    return s
                                })
                            }
                        )
                        res.send('Service updated in cart')
                } else {
                    const tax = 1000< service.price && service.price < 8000 ? "10%" : service.price > 8000 ? "15%" : "Flat 100"
                    await Cart.findOneAndUpdate(
                        {user_id: user._id},
                        {$push: {services: {service: service, quantity: 1, tax:tax}}}
                    )
                    res.send('Service added to cart')
                }
            } else {
                const tax = 1000< service.price && service.price < 8000 ? "10%" : service.price > 8000 ? "15%" : "Flat 100"
                await Cart.create({
                    user_id: user._id,
                    products: [],
                    services: [{
                        service: service,
                        quantity: 1,
                        tax: tax
                    }]
                })
                res.json({status: 'ok', message: 'User added to cart'})
            }
        }
    }   
})

router.delete('/delete', async (req,res) => {
    const user = await User.findOne({
        email: req.body.email,
    })
    if (req.body.product_id){
        const product = await Product.findOne({_id: req.body.product_id})
        const cart = await Cart.findOne({user_id: user._id})
        if (product){
            if (cart){
                if (cart.products.length != 0){
                    cart.products.map(async (p) => {
                        if (p.product._id == product._id){
                            if (p.quantity > 1) {
                                await Cart.findOneAndUpdate(
                                    {
                                        user_id: user._id,
                                    },
                                    {
                                        products: cart.products.map(p => {
                                            if (p.product._id == product._id){
                                                p.quantity -= 1
                                            }
                                            return p
                                        })
                                    }
                                )
                                res.send('Product updated in cart')
                            } else if (p.quantity == 1) {
                                await Cart.findOneAndUpdate(
                                    {user_id: user._id},
                                    {products: cart.products.filter(p => p.product._id != product._id)}
                                )
                                res.send('Product removed from cart')
                            }
                        } else {
                            res.send('Product not found in cart')
                        }
                    })
                } else {
                    res.send('No products in cart')
                }
            } else {
                res.json({status: 'ok', message: 'User has no products to remove from cart'})
            }
        }
    } else if (req.body.service_id){
        const service = await Service.findOne({_id: req.body.service_id})
        const cart = await Cart.findOne({user_id: user._id})
        if (service){
            if (cart){
                cart.services.map(async (s) => {
                    if (s.service._id == service._id){
                        if (s.quantity > 1) {
                            await Cart.findOneAndUpdate(
                                {
                                    user_id: user._id,
                                },
                                {
                                    services: cart.services.map(s => {
                                        if (s.service._id == service._id){
                                            s.quantity -= 1
                                        }
                                        return s
                                    })
                                }
                            )
                            res.send('Service updated in cart')
                        } else {
                            await Cart.findOneAndUpdate(
                                {user_id: user._id},
                                {services: cart.services.filter(s => s.service._id != service._id)}
                            )
                            res.send('Service removed from cart')
                        }
                    }
                })
            } else {
                res.json({status: 'ok', message: 'User has no services to remove from cart'})
            }    
        }
    } 
})

module.exports = router;