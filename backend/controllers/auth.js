const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const generateTokenAndSetCookie = require('../utils/generateTokenAndSetCookie')
require('dotenv').config();

const register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.json({ success: false, message: "missing cerdentials" })
    }
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.json({ success: false, message: "user already exists" })
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashPassword });
        await user.save();
        generateTokenAndSetCookie(user._id, res);
res.status(200).json({message:"user is register"});
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.json({ sucess: false })
    }
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.json({ success: false });
        }
        const ismatch = await bcrypt.compare(password, user.password)
        if (!ismatch) {
            res.json({ sucess: false, message: "password is not matching" })
        }
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
			_id: user._id,
			username: user.username,
			email: user.email,
			bio: user.bio,
			profilePic: user.profilePic,
		});
    } catch (error) {
        console.log(error);
    }
}
const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 1 });
		res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error(error);
    }
}
module.exports = {register,login,logout};