const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Protected route for authenticated users
router.get('/', authMiddleware, (req, res) => {
  res.json({
    message: 'Welcome to the protected route!',
    user: req.user
  });
});

// Protected route for admin users only
router.get('/admin', authMiddleware, roleMiddleware(['admin']), (req, res) => {
    res.json({
        message: 'Welcome, Admin! This is a role-based protected route.',
        user: req.user 
    });
});

module.exports = router;