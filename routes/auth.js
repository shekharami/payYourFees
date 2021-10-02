const express = require('express');
const authController = require('../controllers/auth/index.js');
const handleRequest = require('../utils/handler').handleRequest;

const router = express.Router();

router.post(
  '/signup',
  handleRequest(async (req, res) =>
    res.status(201).json({
      status: 'success',
      data: await authController.signUp(req, res)
    })
  )
);

router.post(
  '/login',
  handleRequest(async (req, res) =>
    res.status(200).json({
      status: 'success',
      data: await authController.logIn(req, res)
    })
  )
);

router.get(
  '/logout',
  handleRequest(async (req, res) =>
    res.status(200).json({
      status: 'success',
      data: await authController.logout(req, res)
    })
  )
);

module.exports = router;
