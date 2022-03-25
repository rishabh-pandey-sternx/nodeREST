const express = require('express');

const router = express.Router();

const { validateJwt } = require('../middlewares/express-jwt');
const authController = require('../controllers/auth.controller');

// Perform the signup action
router.post('/register', authController.signUp);

// Perform the login
router.post('/login', authController.login);

// sends a new token and user data , after validating old token
router.post('/refresh-token', validateJwt(), authController.refreshToken);

// Updates the password for the given user's email
router.post('/change-password', validateJwt(), authController.changePassword);

// Sends mail for that user's email with link to change password
router.post('/forgot-password', authController.forgotPassword);

// reset password
router.get('/reset-password', authController.resetPassword);

module.exports = router;
