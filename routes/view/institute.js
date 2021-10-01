const express = require('express');
const viewController = require('../../controllers/view/index');
const instituteViewController = require('../../controllers/institute/view');
const authController = require('../../controllers/auth/index');
const instituteController = require('../../controllers/institute/index');
const studentController = require('../../controllers/student/index');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/dashboard', instituteViewController.dashboard);

router.get('/profile', instituteViewController.profile);

router.get('/search-students', instituteViewController.searchStudent);

router.get('/add-students', instituteViewController.addStudents);

router.get('/view-students', instituteViewController.viewStudents);

router.get(
  '/student-detail/:studentId',
  studentController.studentDetailsById,
  instituteController.feesDetails,
  instituteViewController.studentDetails
);

router.get(
  '/fees-management',
  instituteController.feesDetails,
  instituteViewController.feesManagement
);

router.get(
  '/fees-management/add-fees',
  instituteController.feesDetails,
  instituteViewController.addFees
);

router.get('/payment-details', instituteViewController.paymentDetails);

router.get('/reports', instituteViewController.reports);

module.exports = router;
