const express = require('express');
const studentController = require('../controllers/student/index');
const authController = require('../controllers/auth/index');

const router = express.Router();

router.route('/test').get(studentController.test);

router.route('/add-student').patch(studentController.addStudent);

router.use(authController.isLoggedIn);

router.route('/search').get(studentController.searchStudent).post(studentController.getStudent);

router.route('/update').post(studentController.updateStudent);

router.route('/fees').post(studentController.getFeesDetails);

module.exports = router;
