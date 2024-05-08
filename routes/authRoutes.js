// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Регистрация и вход
router.post('/register', userController.register);
router.post('/login', userController.login);

// Получение информации о текущем пользователе
router.get('/me', auth, userController.getCurrentUser);

module.exports = router;
