const express = require('express');
const razorpayController = require('../controllers/razorpayController');
const studentController = require('../controllers/studentController');
const authController = require('../controllers/authController');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

router.use(authController.isLoggedIn)
router.route('/verify').post(razorpayController.verifyPayment)

router.route('/createOrder').post( studentController.getFeesDetails , razorpayController.createOrder)

router.route('/record-cash-payment').post(paymentController.recordCashPayment)

module.exports = router;