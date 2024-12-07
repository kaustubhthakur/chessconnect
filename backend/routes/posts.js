const express = require('express')
const router = express.Router();
const protectRoute = require('../utils/protectRoute')
const { createPost,likeUnlikePost,getPost,getPosts,deletePost,getFeedPosts } = require('../controllers/posts')
router.post('/', protectRoute, createPost)
router.put('/:id/vote',protectRoute,likeUnlikePost);
router.delete('/:id',protectRoute,deletePost)
router.get('/:id',protectRoute,getPost)
router.get('/',protectRoute,getFeedPosts)
router.get('/',getPosts)
module.exports = router;