const express = require('express')
const router = express.Router();
const {followUnFollowUser,getUserProfile,updateUser} = require('../controllers/users')
const protectRoute = require('../utils/protectRoute')
router.put('/:id/follow',protectRoute,followUnFollowUser)
router.get('/:id',protectRoute,getUserProfile)
router.put('/:id',protectRoute,updateUser);
module.exports = router;