const express = require('express');
const viewController = require('./../controllers/viewController');
const instituteViewController = require('./../controllers/instituteViewController');
const authController = require('./../controllers/authController');
const instituteController = require('./../controllers/instituteController');

const router = express.Router();

router.get('/dashboard', instituteViewController.dashboard)

module.exports = router;