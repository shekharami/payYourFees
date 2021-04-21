const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');
// const noteController = require('./../controllers/noteController');


const router = express.Router();

router.get('/logout', viewController.getLogout );

router.use(authController.isLoggedIn)

router.get('/', viewController.getHome );

router.get('/my_profile', viewController.getProfile );

router.get('/signup', viewController.signup );

router.get('/login', viewController.login );

// router.use(noteController.getNoteforTemplate);

router.get('/myNotes',viewController.getNotes );


module.exports = router;