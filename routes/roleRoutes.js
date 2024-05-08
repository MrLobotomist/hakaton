const express = require('express');
const router = express.Router();
const postController = require('../controllers/roleController');
const auth = require('../middleware/auth');


router.post('/set', auth, postController.setRole);
router.delete('/del', auth, postController.deleteRole);

module.exports = router