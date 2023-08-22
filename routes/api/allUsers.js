const express = require("express");
const router = express.Router();

const User = require('../../models/users')

router.get('/', async (req,res) => {
    const user = await User.findOne({
        email: req.body.email,
    })
    if (user.role == 'admin'){
        const users = await User.find({});
        res.json(users);
    } else {
        res.json({status: 'error', error: 'Unauthorized'})
    }   
})

module.exports = router;