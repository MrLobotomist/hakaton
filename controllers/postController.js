const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const sequelize = require('../config/database');
const initModels = require('../models/init-models');
const {posts} = initModels(sequelize);
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
    const { title, content, user_id } = req.body;
    try {
        const newPost = await posts.create({ title, content, user_id });
        res.status(201).json(newPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


exports.deletePost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await posts.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        await post.destroy();
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updatePost = async (req, res) => {
    const postId = req.params.id;
    const { title, content, user_id } = req.body;
    try {
        // Находим пост по его идентификатору
        const post = await posts.findByPk(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        // Обновляем данные поста
        await post.update({ title, content, user_id });
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