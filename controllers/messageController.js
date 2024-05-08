const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const sequelize = require('../config/database');
const initModels = require('../models/init-models');
const { post_messages, posts, users } = initModels(sequelize);

exports.addMessageToPost = async (req, res) => {

    const { message, user_id, post_id } = req.body;
    try {
        const newMessage = await post_messages.create({ message, user_id, post_id });
        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteMessage = async (req, res) => {
    const messageId = req.params.Id;
    try {
        const message = await post_messages.findByPk(messageId);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }
        await message.destroy();
        res.json({ message: 'Message deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getAllMessagesForPost = async (req, res) => {
    const postId = req.params.id;
    try {
        const messages = await post_messages.findAll({
            where: { post_id: postId },
            include: [{ model: users, as: 'user', attributes: ['username'] }]
        });
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};