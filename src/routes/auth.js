const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

// Perform the signup action
router.post('/register', authController.signUp);

// Perform the login
router.post('/login', authController.login);

// Sends mail for that user's email with link to change password
router.post('/forgot-password', authController.forgotPassword);

// reset password
router.post('/reset-password', authController.resetPassword);

module.exports = router;
