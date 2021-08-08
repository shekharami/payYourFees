const express = require('express');
const viewController = require('./../controllers/viewController');
const adminViewController = require('./../controllers/adminViewController');
const authController = require('./../controllers/authController');
const userController = require('./../controllers/userController');
const instituteController = require('./../controllers/instituteController');

const router = express.Router();

// Protected Routes

router.use(authController.isLoggedIn)

router.get('/dashboard', adminViewController.dashboard)

router.get('/manage-users', adminViewController.userManagement)

router.get('/manage-institutes', adminViewController.instituteManagement)

router.get('/logout', authController.logout ,viewController.logout)

module.exports = router;