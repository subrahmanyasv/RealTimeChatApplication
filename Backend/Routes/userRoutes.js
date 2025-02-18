import express from 'express';
import { login, signup, getUser } from '../Controllers/userController.js';
import { loginValidation , signupValidation } from '../Controllers/authValidations.js';

const router = express.Router();

// Login route
router.post('/login', loginValidation , login);

// Signup route
router.post('/signup', signupValidation , signup);

// Get user route
// router.get('/getUser', getUser);

export default router;
