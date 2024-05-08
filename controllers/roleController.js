const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const sequelize = require('../config/database');
const initModels = require('../models/init-models');
const {roles, users, user_role} = initModels(sequelize);

exports.setRole = async (req, res) => {
    const {user_id, role} = req.body;
    try {
        // Извлечение текущего пользователя
        const user = await users.findByPk(req.user.user_id, {
            attributes: ['user_id', 'username']
        });

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        // Извлечение ролей текущего пользователя
        const userRoles = await user_role.findAll({where: {user_id: user.user_id}});

        // Проверка прав: пользователь должен быть администратором (role_id = 1)
        const isAdmin = userRoles.some((role) => role.role_id === 1);

        if (!isAdmin) {
            return res.status(403).json({message: 'Недостаточно прав'});
        }

        const changedUser = await users.findByPk(user_id, {
            attributes: ['user_id', 'username']
        });
        const changedUserRoles = await user_role.findAll({where: {user_id: user_id}});

        if (changedUserRoles.some((role) => role.role_id === role))
            return res.status(403).json({message: 'Уже имеется такая роль у юзера'});

        const newRoles = await userRoles.create({user_id: user.user_id, role_id: role});
        res.json(newRoles);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};

exports.deleteRole = async (req, res) => {
    const {user_id, role} = req.body;
    try {
        // Извлечение текущего пользователя
        const user = await users.findByPk(req.user.user_id, {
            attributes: ['user_id', 'username']
        });

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        // Извлечение ролей текущего пользователя
        const userRoles = await user_role.findAll({where: {user_id: user.user_id}});

        // Проверка прав: пользователь должен быть администратором (role_id = 1)
        const isAdmin = userRoles.some((role) => role.role_id === 1);

        if (!isAdmin) {
            return res.status(403).json({message: 'Недостаточно прав'});
        }

        const changedUser = await users.findByPk(user_id, {
            attributes: ['user_id', 'username']
        });
        const changedUserRoles = await user_role.findOne({where: {user_id: user_id, role_id: role}});

        await changedUserRoles.destroy();

        res.json({ message: 'Role deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
};

