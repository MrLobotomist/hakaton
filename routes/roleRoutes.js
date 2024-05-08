const express = require('express');
const router = express.Router();
const postController = require('../controllers/roleController');
const auth = require('../middleware/auth');


router.post('/posts', auth, postController.setRole);
router.delete('/posts', auth, postController.deleteRole);

module.exports = router