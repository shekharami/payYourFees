const express = require('express');
const studentController = require('../controllers/studentController');


const router = express.Router();

router.route('/test').get(studentController.test)
router.route('/add-student').patch(studentController.addStudent)
router.route('/search').post(studentController.getStudent)

module.exports = router;