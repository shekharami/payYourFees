const express = require('express');
const viewController = require('../../controllers/view/index');
const adminViewController = require('../../controllers/admin/view');
const authController = require('../../controllers/auth/index.js');
const userController = require('../../controllers/user/index');
const instituteController = require('../../controllers/institute/index.js');

const router = express.Router();

// Protected Routes

// router.use(authController.isLoggedIn);

router.get('/dashboard', adminViewController.dashboard);

router.get('/manage-users', adminViewController.userManagement);

router.get('/manage-institutes', adminViewController.instituteManagement);

router.get('/logout', authController.logout, viewController.logout);

module.exports = router;
