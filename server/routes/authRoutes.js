const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Public routes
router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// Protected routes
router.get('/profile', authMiddleware, authController.getUserProfile);
router.post('/change-password', authMiddleware, authController.changePassword);
router.get('/users', authMiddleware, roleMiddleware(['admin']), authController.getAllUsers);
router.delete('/users/:userId', authMiddleware, roleMiddleware(['admin']), authController.deleteUser);

module.exports = router;