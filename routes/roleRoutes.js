const express = require('express');
const router = express.Router();
const postController = require('../controllers/roleController');
const auth = require('../middleware/auth');


router.post('/role', auth, postController.setRole);
router.delete('/role', auth, postController.deleteRole);

module.exports = router