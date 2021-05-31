const express = require('express');
const viewController = require('./../controllers/viewController');
const instituteViewController = require('./../controllers/instituteViewController');
const authController = require('./../controllers/authController');
const instituteController = require('./../controllers/instituteController');

const router = express.Router();


router.use(authController.isLoggedIn)

router.get('/dashboard',  instituteViewController.dashboard)

router.get('/add-students', instituteViewController.addStudents)

module.exports = router;