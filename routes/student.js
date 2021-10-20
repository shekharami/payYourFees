const express = require('express');
const studentController = require('../controllers/student/index');
const authController = require('../controllers/auth/index');
const userController = require('../controllers/user/index');
const handleRequest = require('../utils/handler').handleRequest;

const router = express.Router();

router.route('/test').get(studentController.test);

router.route('/add-student').patch(studentController.addStudent);

router.use(authController.isLoggedIn);

router.route('/search').get(studentController.searchStudent).post(studentController.getStudent);

router.route('/update').post(studentController.updateStudent);

router.route('/fees').post(studentController.getFeesDetails);

router.post(
  '/add-to-cart',
  handleRequest(async (req, res, next) =>
    res.status(200).json({
      status: 'success',
      data: await userController.addToCart(req, res, next)
    })
  )
);

module.exports = router;
