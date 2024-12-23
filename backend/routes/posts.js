const express = require('express')
const protectRoute = require('../utils/protectRoute')
const router = express.Router();
const {deletePost,createPost,likeUnlikePost,getFeedPosts,getUserPosts,getPost} = require('../controllers/posts')
router.delete('/:id/delete',protectRoute,deletePost)
router.put('/:id/vote',protectRoute,likeUnlikePost)
router.post('/',protectRoute,createPost)
router.get('/:id/profile',protectRoute,getPost)
router.get('/',getUserPosts
)
router.get('/',getFeedPosts)
module.exports = router;