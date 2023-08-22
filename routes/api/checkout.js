const express = require("express");
const router = express.Router();

const User = require('../../models/users')
const Cart = require('../../models/cart')

router.get('/', async (req,res) => {
    const user = await User.findOne({
        email: req.body.email,
    })
    const cart = await Cart.findOne({user_id: user._id})
    if (cart){
        await Cart.findOneAndUpdate(
            {user_id: user._id},
            {products: [], services: []}
        )
        res.send('Cart cleared')
    } else {
        res.send('Cart is empty')
    }
})

module.exports = router;