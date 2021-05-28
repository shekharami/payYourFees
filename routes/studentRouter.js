const express = require('express');
const studentController = require('../controllers/studentController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/test').get(studentController.test)
router.route('/add-student').patch(studentController.addStudent)
router.route('/search')
.get(authController.isLoggedIn , studentController.searchStudent)
.post(studentController.getStudent)

module.exports = router;