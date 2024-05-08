// controllers/userController.js
const sequelize = require('../config/database');
const initModels = require('../models/init-models');

const {chats, messages, Users} = initModels(sequelize);

// Создание нового чата
exports.chat_create = async (req, res) => {
    const {name} = req.body;
    try {
        const newChat = await chats.create({name: name});
        res.status(201).json({message: 'Chat created', body: newChat});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
};

// Создание нового сообщения
exports.msg_send = async (req, res) => {
    const {text, chat_id} = req.body;
    const user = await Users.findByPk(req.user.userId, {
        attributes: ['id', 'username']
    });
    try {
        const newMsg = await messages.create({text: text, chat_id: chat_id, sender_id: user.id});
        res.status(201).json({message: 'Message sent', body: newMsg});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
};

exports.chats_get = async (req, res) => {
    const newChat = await chats.findAll();
    try {
        res.status(201).json({message: 'Send chats', body: newChat});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
};

exports.msg_in_chat_get = async (req, res) => {
    const {chat_id} = req.body;
    // Поиск всех сообщений в указанном чате
    const msg = await messages.findAll({ where: { chat_id: chat_id } });
    try {
        res.status(201).json({message: 'Send messsages', body: msg});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
};

exports.all_msg_in_user_chat = async (req, res) => {
    const user = await Users.findByPk(req.user.userId, {
        attributes: ['id', 'username']
    });
    // Поиск всех сообщений в указанном чате
    const msg = await Users.findByPk(user.id, {
        include: [
            {
                model: chats,
                include: [
                    {
                        model: messages
                    }
                ]
            }
        ]
        }
    );
    try {
        res.status(201).json({message: 'Send messsages', body: msg});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
};