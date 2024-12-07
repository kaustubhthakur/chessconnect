const express = require('express')
const router = express.Router();
const protectRoute = require('../utils/protectRoute')
const { getUser,getUsers,followUnFollowUser,updateUser } = require('../controllers/users')
router.put('/:id/vote',protectRoute,updateUser);
router.put('/:id/follow',protectRoute,followUnFollowUser)
router.get('/:id',protectRoute,getUser)
router.get('/',getUsers)
module.exports = router;