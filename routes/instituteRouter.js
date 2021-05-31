const path = require('path')
const express = require('express');
const multer = require('multer')

const dest = path.join(__dirname, './../uploads')
const upload = multer({ dest })
const instituteController = require('../controllers/instituteController');
const authController = require('../controllers/authController');

const router = express.Router();

router
.route('/details/:instituteId')
.get(instituteController.getInstituteDetails);

router
.route('/list')
.get(instituteController.getInstitutes);

// router
// .route('/signup')
// .post(instituteController.saveInsitute);

router
.route('/delete/:instituteId')
.delete(instituteController.deleteInstitute);


router.use(authController.isLoggedIn)


router
.route('/upload')
.post(upload.single('myfile'), instituteController.fileUpload);

router
.route('/update')
.patch(instituteController.updateInstituteData);

module.exports = router;