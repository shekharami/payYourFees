const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
const instituteController = require('./../controllers/instituteController');
// const noteController = require('./../controllers/noteController');


const router = express.Router();

// router.get('/logout', viewController.getLogout );

// router.use(authController.isLoggedIn)

// router.get('/', viewController.getHome )

// router.get('/my_profile', viewController.getProfile );

// router.get('/signup', viewController.signup );

// router.get('/login', viewController.login );

// router.use(noteController.getNoteforTemplate);

// router.get('/myNotes',viewController.getNotes );

//new - routes -----------------------------------------------------------

router.get('/', instituteController.getInstitutes ,viewController.p_homepage)

router.get('/user-login', viewController.p_userLogin)

router.get('/institute-login', viewController.p_instituteLogin)

router.get('/user-signup', instituteController.getInstitutes ,viewController.p_userSignup)

router.get('/institute-signup', viewController.p_instituteSignup)

// Protected Routes

router.use(authController.isLoggedIn)

router.get('/dashboard', viewController.p_dashboard)

router.get('/checkout', viewController.getCheckout)

router.get('/add-student', viewController.addStudent)

module.exports = router;