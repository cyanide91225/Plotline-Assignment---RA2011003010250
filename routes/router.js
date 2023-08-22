const express = require('express');
const router = express.Router();

router.use('/register', require('./api/register'));
router.use('/login', require('./api/login'));
router.use('/users', require('./api/allUsers'));
router.use('/products', require('./api/products'));
router.use('/services', require('./api/services'));
router.use('/cart', require('./api/cart'));
router.use('/checkout', require('./api/checkout'));
router.use('/generatebill', require('./api/generatebill'));

module.exports = router;
