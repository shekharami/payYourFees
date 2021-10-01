const express = require('express');
const userController = require('../controllers/user/index');
const authController = require('../controllers/auth/index');

const router = express.Router();

router.use(authController.isLoggedIn);
router.route('/update').patch(userController.updateUser);

module.exports = router;
