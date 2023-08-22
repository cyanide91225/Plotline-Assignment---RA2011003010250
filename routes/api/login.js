const express = require("express");
const router = express.Router();

const User = require('../../models/users')
const Cart = require('../../models/cart')

router.post('/', async (req,res) => {
    const user = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })
    if (user){
        const cart = await Cart.findOne({user_id: user._id})
        if (!cart){
            await Cart.create({
                user_id: user._id,
                products: [],
                services: []
            })
        }
        return res.json({status: 'ok', user: true})
    } else {
        return res.json({status: 'error', user: false})
    }
})

module.exports = router;