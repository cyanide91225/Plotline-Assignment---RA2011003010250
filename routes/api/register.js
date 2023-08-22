const express = require("express");
const router = express.Router();

const User = require('../../models/users')

router.post('/', async (req,res) => {
    try {
        await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            role: req.body.name == process.env.ADMIN_NAME && req.body.email == process.env.ADMIN_EMAIL && req.body.password == process.env.ADMIN_PASSWORD ? 'admin' : 'customer'
        })
        res.json({status: 'ok'})
    } catch (err){
        res.json({status: 'error', error: 'Duplicate Email'})
    }
})

module.exports = router;