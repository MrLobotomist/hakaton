const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');


router.get('/message/:id', messageController.getAllMessagesForPost);
router.delete('/message/:id', messageController.deleteMessage);
router.post('/message', messageController.addMessageToPost);

module.exports = router