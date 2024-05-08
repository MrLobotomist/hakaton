const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');


router.get('/posts', postController.GetPost);
router.post('/posts', postController.createPost);
router.delete('/posts/:id', postController.deletePost);
router.put('/posts/:id', postController.updatePost);
router.get('/posts/:id', postController.GetPostByID);

module.exports = router