const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn)
router.route('/update').patch(userController.updateUser)

module.exports = router;