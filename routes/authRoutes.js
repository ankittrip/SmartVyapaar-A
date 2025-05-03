const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /login route
router.post('/login', authController.login);

module.exports = router;
