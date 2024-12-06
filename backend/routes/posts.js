const express = require('express')
const router = express.Router();
const protectRoute = require('../utils/protectRoute')
const { createPost } = require('../controllers/posts')
router.post('/', protectRoute, createPost)
module.exports = router;