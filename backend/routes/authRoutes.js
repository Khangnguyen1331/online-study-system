const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');

const router = express.Router();

// Route đăng ký
router.post('/register', registerUser);

// Route đăng nhập
router.post('/login', loginUser);

module.exports = router;
