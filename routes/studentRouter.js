const express = require('express');
const studentController = require('../controllers/studentController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/test').get(studentController.test)

router.route('/add-student').patch(studentController.addStudent)

router.use(authController.isLoggedIn)

router.route('/search')
.get(studentController.searchStudent)
.post(studentController.getStudent)

router.route('/update')
.post(studentController.updateStudent)


router.route('/fees').post(studentController.getFeesDetails)

module.exports = router;