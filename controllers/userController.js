// controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const sequelize = require('../config/database');
const initModels = require('../models/init-models');

const {access_tokens, users, roles, user_role} = initModels(sequelize);

// Регистрация нового пользователя
exports.register = async (req, res) => {
    const {username, password} = req.body;
    try {
        // Проверяем, существует ли пользователь с таким именем
        const existingUser = await users.findOne({where: {username}});
        if (existingUser) {
            return res.status(400).json({message: 'Username already taken'});
        }

        // Хешируем пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Создаем нового пользователя
        const newUser = await users.create({username, password: hashedPassword});

        const newUserRole = await user_role.create({user_id: newUser.user_id, role_id: 2})

        res.status(201).json({message: 'User created', user: newUser, roleUser: newUserRole});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error'});
    }
};

// Авторизация пользователя и выдача токена
exports.login = async (req, res) => {
    const {username, password} = req.body;
    try {
        const user = await users.findOne({where: {username}});
        const user_roles = await user_role.findAll({where: {user_id: user.user_id}});
        let role_id = user_roles[0].role_id;
        for (let i = 0; i < user_roles.length; i++) {
            const userRole = user_roles[i];
            if (role_id === null || userRole.role_id < role_id) {
                role_id = userRole.role_id;
            }
        }

        // Проверка пользователя
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        // Создание JWT токена
        const token = jwt.sign({user_id: user.user_id, role_id: role_id}, config.secretKey, {
            expiresIn: '1h'
        });

        const tokenDB = await access_tokens.findOne({where: {user_id: user.user_id}});

        if(!tokenDB) {
            // Сохранение токена в базе данных
            await access_tokens.create({ id: user.id, token });
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
        const user = await users.findByPk(req.user.user_id, {
            attributes: ['user_id', 'username']
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
