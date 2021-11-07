const express = require('express');
const viewController = require('../../controllers/view/index');
const authController = require('../../controllers/auth/index');
const userController = require('../../controllers/user/index');
const instituteController = require('../../controllers/institute/index');

const router = express.Router();

router.get('/', instituteController.getInstitutes, viewController.homepage);

router.get('/user-login', viewController.userLogin);

router.get('/institute-login', viewController.instituteLogin);

router.get('/user-signup', instituteController.getInstitutes, viewController.userSignup);

router.get('/institute-signup', viewController.instituteSignup);

// Protected Routes

router.use(authController.isLoggedIn);

router.get('/cart', viewController.getCart);

router.use(userController.getCartDetails);

router.get('/dashboard', userController.taggedStudentDetails, viewController.dashboard);

router.get('/checkout', viewController.getCheckout);

router.get('/notifications', viewController.getNotifications);

router.get('/history', viewController.getHistory);

router.get(
  '/link-student',
  instituteController.getInstitutes,
  userController.taggedStudentDetails,
  viewController.linkStudent
);

router.get('/my-profile', viewController.myProfile);

router.get('/payment-history', viewController.paymentHistory);

router.get('/logout', authController.logout, viewController.logout);

module.exports = router;
