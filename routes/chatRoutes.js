// routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');
const auth = require('../middleware/auth');

// Регистрация и вход
router.post('/chat_create', auth, chatController.chat_create);
router.post('/msg_send', auth, chatController.msg_send);
router.get('/chats_get', auth, chatController.chats_get);
router.get('/msg_in_chat_get', auth, chatController.msg_in_chat_get);
router.get('/all_msg_in_user_chat', auth, chatController.all_msg_in_user_chat);

module.exports = router;
