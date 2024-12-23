const express = require('express')
const router = express.Router()
const protectRoute = require('../utils/protectRoute')
const {followUnFollowUser,updateUser,getAllUsers,getUserProfile} = require('../controllers/users')
router.put('/:id/follow',protectRoute,followUnFollowUser)
router.put('/:id',protectRoute,updateUser)
router.get('/:id',protectRoute,getUserProfile)
router.get('/',getAllUsers)
module.exports = router;