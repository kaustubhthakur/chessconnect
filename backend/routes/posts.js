const express = require('express')
const router = express.Router();
const protectRoute = require('../utils/protectRoute')
const {createPost,likeUnlikePost,getPost,getPosts,deletePost} = require('../controllers/posts')
router.post('/',protectRoute,createPost)
router.get('/:id',protectRoute,getPost)
router.get('/',getPosts)
router.put('/:id/vote',protectRoute,likeUnlikePost)
router.delete('/:id/delete',protectRoute,deletePost)
module.exports = router;