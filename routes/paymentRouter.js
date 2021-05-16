const express = require('express');
const razorpayController = require('../controllers/razorpayController');


const router = express.Router();

router.route('/verify').post(razorpayController.verifyPayment)

router.route('/order').post(razorpayController.createOrder)

module.exports = router;