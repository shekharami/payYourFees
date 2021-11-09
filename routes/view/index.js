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

router.get('/cart', userController.getCartDetails, viewController.getCart); //provide each fee a priority number and based on that priority
// fee will be selected for  month || like jan -> 1, feb -> 2, mar-> 3, mar exam -> 3, mar dev -> 3
// fees havng same prority will be picked for one payment

router.use(userController.getCartCount);

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
