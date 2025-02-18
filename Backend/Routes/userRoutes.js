import express from 'express';
import { login, signup, getUser } from '../Controllers/userController.js';

const router = express.Router();

// Login route
router.post('/login', login);

// Signup route
router.post('/signup', signup);

// Get user route
// router.get('/getUser', getUser);

export default router;
