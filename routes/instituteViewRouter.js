const express = require('express');
const viewController = require('./../controllers/viewController');
const instituteViewController = require('./../controllers/instituteViewController');
const authController = require('./../controllers/authController');
const instituteController = require('./../controllers/instituteController');
const studentController = require('./../controllers/studentController');

const router = express.Router();


router.use(authController.isLoggedIn)

router.get('/dashboard',  instituteViewController.dashboard)

router.get('/add-students', instituteViewController.addStudents)

router.get('/student-detail/:studentId', studentController.studentDetailsById, instituteViewController.studentDetails)

router.get('/fees-management', instituteController.feesDetails , instituteViewController.feesManagement)

router.get('/fees-management/add-fees', instituteController.feesDetails , instituteViewController.addFees)

module.exports = router;