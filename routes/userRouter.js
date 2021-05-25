const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/updateUser').patch(userController.updateUser)

module.exports = router;