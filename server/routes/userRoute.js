const express = require('express');
const router = express.Router();
const createUser = require('../controllers/userControllers.js');

router.post('/users', createUser);

module.exports = router;