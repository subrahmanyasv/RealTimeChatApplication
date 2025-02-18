//This is a route module for user authentication
import express from 'express';
import { login, signup, getUser } from '../Controllers/userController.js';
import { loginValidation , signupValidation } from '../Middlewares/authValidations.js';

const router = express.Router();

// Login route with loginValidation middleware
router.post('/login', loginValidation , login);

// Signup route with signupValidation middleware
router.post('/signup', signupValidation , signup);

// Get user route
// router.get('/getUser', getUser);

export default router;
