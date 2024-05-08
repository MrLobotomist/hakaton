// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Регистрация и вход

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Регистрация юзера
 *     description: Регистрация юзера
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Успешный ответ
 */
router.post('/register', userController.register);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Получение токена для аутентификации пользователя
 *     description: >
 *       Позволяет пользователям аутентифицироваться, предоставляя свое имя пользователя и пароль.
 *       В ответ возвращается JWT токен, который может быть использован для доступа к защищенным ресурсам.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Имя пользователя для аутентификации.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Пароль пользователя.
 *     responses:
 *       '200':
 *         description: Успешный ответ. Возвращается JWT токен.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT токен, который может быть использован для аутентификации в будущих запросах.
 *       '401':
 *         description: Неверные учетные данные. Не удалось аутентифицировать пользователя.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Сообщение об ошибке.
 */
router.post('/login', userController.login);

// Получение информации о текущем пользователе
router.get('/me', auth, userController.getCurrentUser);

module.exports = router;
