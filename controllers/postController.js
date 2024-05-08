const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const sequelize = require('../config/database');
const initModels = require('../models/init-models');
const {posts, users, user_role} = initModels(sequelize);

exports.GetPost = async (req, res) => {
    try {
        // Получаем все посты из базы данных
        const allPosts = await posts.findAll(); // Используйте Post вместо posts
        res.json(allPosts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createPost = async (req, res) => {
    const user = await users.findByPk(req.user.user_id, {
        attributes: ['user_id', 'username']
    });
    const { title, content } = req.body;
    try {
        const newPost = await posts.create({ title, content, user_id: user.user_id });
        res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.deletePost = async (req, res) => {
    const postId = req.params.id;

    try {
        // Извлечение текущего пользователя
        const user = await users.findByPk(req.user.user_id, {
            attributes: ['user_id', 'username']
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Извлечение ролей текущего пользователя
        const userRoles = await user_role.findAll({ where: { user_id: user.user_id } });

        // Найти пост по ID
        const post = await posts.findByPk(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Проверка прав: пользователь должен быть владельцем поста или администратором (role_id = 1)
        const isAdmin = userRoles.some((role) => role.role_id === 1);
        const isOwner = user.user_id === post.user_id;

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ message: 'Недостаточно прав' });
        }

        // Удаление поста
        await post.destroy();
        res.json({ message: 'Post deleted successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updatePost = async (req, res) => {
    const postId = req.params.id;
    const { title, content} = req.body;
    try {
        // Извлечение текущего пользователя
        const user = await users.findByPk(req.user.user_id, {
            attributes: ['user_id', 'username']
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Извлечение ролей текущего пользователя
        const userRoles = await user_role.findAll({ where: { user_id: user.user_id } });

        // Находим пост по его идентификатору
        const post = await posts.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Проверка прав: пользователь должен быть владельцем поста или администратором (role_id = 1)
        const isAdmin = userRoles.some((role) => role.role_id === 1);
        const isOwner = user.user_id === post.user_id;

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ message: 'Недостаточно прав' });
        }

        // Обновляем данные поста
        await post.update({ title, content, user_id: user.user_id });
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.GetPostByID = async (req, res) => {
    const postId = req.params.id;
    try {
        // Получаем все посты из базы данных
        const post = await posts.findByPk(postId); // Используйте Post вместо posts
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};