const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const instituteController = require('./../controllers/instituteController');

const router = express.Router();

router.get('/', instituteController.getInstitutes ,viewController.homepage)

router.get('/user-login', viewController.userLogin)

router.get('/institute-login', viewController.instituteLogin)

router.get('/user-signup', instituteController.getInstitutes ,viewController.userSignup)

router.get('/institute-signup', viewController.instituteSignup)

// Protected Routes

router.use(authController.isLoggedIn)

router.get('/dashboard', userController.taggedStudentDetails, viewController.dashboard)

router.get('/checkout', viewController.getCheckout)

router.get('/add-student', instituteController.getInstitutes ,viewController.addStudent)

router.get('/my-profile', viewController.myProfile)

router.get('/logout', authController.logout ,viewController.logout)

module.exports = router;