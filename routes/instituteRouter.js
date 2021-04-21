const express = require('express');
const instituteController = require('../controllers/instituteController');

const router = express.Router();

router
.route('/get')
.post(instituteController.getNote);

router
.route('/save')
.post(instituteController.saveInsitute);

router
.route('/delete/:id')
.delete(instituteController.deleteNote);

router
.route('/update')
.patch(instituteController.updateNote)

module.exports = router;