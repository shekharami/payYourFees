const express = require('express');
const viewController = require('./../controllers/viewController');
const instituteViewController = require('./../controllers/instituteViewController');
const authController = require('./../controllers/authController');
const instituteController = require('./../controllers/instituteController');
const studentController = require('./../controllers/studentController');

const router = express.Router();


router.use(authController.isLoggedIn)

router.get('/dashboard',  instituteViewController.dashboard)

router.get('/profile',  instituteViewController.profile)

router.get('/search-students',  instituteViewController.searchStudent)

router.get('/add-students', instituteViewController.addStudents)

router.get('/student-detail/:studentId', studentController.studentDetailsById, instituteController.feesDetails, instituteViewController.studentDetails)

router.get('/fees-management', instituteController.feesDetails , instituteViewController.feesManagement)

router.get('/fees-management/add-fees', instituteController.feesDetails , instituteViewController.addFees)

router.get('/payment-details',  instituteViewController.paymentDetails)

router.get('/reports',  instituteViewController.reports)

module.exports = router;