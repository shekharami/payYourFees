const express = require('express');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/signup').post(authController.signUp)

router.route('/login').post(authController.logIn)

router.route('/updateUser').patch(userController.updateUser)

router.route('/logout').get(authController.logout)

module.exports = router;