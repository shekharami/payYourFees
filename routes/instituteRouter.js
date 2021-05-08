const express = require('express');
const instituteController = require('../controllers/instituteController');

const router = express.Router();

router
.route('/details/:instituteId')
.get(instituteController.getInstituteDetails);

router
.route('/signup')
.post(instituteController.saveInsitute);

router
.route('/delete/:instituteId')
.delete(instituteController.deleteInstitute);

router
.route('/update')
.patch(instituteController.updateInstituteData)

module.exports = router;