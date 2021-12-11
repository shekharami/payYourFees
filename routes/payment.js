const express = require('express');
const razorpayController = require('../controllers/payment/razorpay');
const studentController = require('../controllers/student/index');
const authController = require('../controllers/auth/index');
const paymentController = require('../controllers/payment/index');

const router = express.Router();

router.use(authController.isLoggedIn);
router.route('/verify').post(razorpayController.verifyPayment);

router
  .route('/createOrder')
  .post(/*studentController.getFeesDetails,*/ razorpayController.createOrder);

router.route('/record-cash-payment').post(paymentController.recordCashPayment);

module.exports = router;
