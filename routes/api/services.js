const express = require("express");
const router = express.Router();

const Service = require('../../models/services')

router.get('/' , async (req,res) => {
    const services = await Service.find({});
    return res.json(services);
})

module.exports = router;