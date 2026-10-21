const express = require('express');
const router = express.Router();
const { createUser, loginUser } = require('../controllers/userControllers.js');

// Registration endpoints
router.post('/signup', createUser);
router.post('/users', createUser); // Maintain backward compatibility with existing callers

// Login endpoint
router.post('/login', loginUser);

module.exports = router;