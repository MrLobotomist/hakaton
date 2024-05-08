const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');


router.get('/posts', postController.GetPost);
router.post('/posts', auth, postController.createPost);
router.delete('/posts/:id', auth, postController.deletePost);
router.put('/posts/:id', auth, postController.updatePost);
router.get('/posts/:id', postController.GetPostByID);

module.exports = router