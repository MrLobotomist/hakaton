// controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const sequelize = require('../config/database');
const initModels = require('../models/init-models');

const {AccessTokens,Users} = initModels(sequelize);

// Регистрация нового пользователя
exports.register = async (req, res) => {
    const {username, password} = req.body;
    try {
        // Проверяем, существует ли пользователь с таким именем
        const existingUser = await Users.findOne({where: {username}});
        if (existingUser) {
            return res.status(400).json({message: 'Username already taken'});
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаем нового пользователя
        const newUser = await Users.create({username, password: hashedPassword});

        res.status(201).json({message: 'User created', user: newUser});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
};

// Авторизация пользователя и выдача токена
exports.login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await Users.findOne({where: {username}});

        // Проверка пользователя
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        // Создание JWT токена
        const token = jwt.sign({userId: user.id}, config.secretKey, {
            expiresIn: '1h'
        });

        const tokenDB = await AccessTokens.findOne({where: {id: user.id}});

        if(!tokenDB) {
            // Сохранение токена в базе данных
            await AccessTokens.create({ id: user.id, token });
        } else {
            // Если токен найден, обновляем его значение
            await tokenDB.update({ token });
        }

        res.json({token});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
};

// Получение информации о текущем пользователе
exports.getCurrentUser = async (req, res) => {
    try {
        const user = await Users.findByPk(req.user.userId, {
            attributes: ['id', 'username']
        });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({message: 'User not found'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
};
