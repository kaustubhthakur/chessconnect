const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
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
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
res.status(200).json({message:"user is register"});
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !email) {
        return res.json({ sucess: false })
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ sucess: false });
        }
        const ismatch = await bcrypt.compare(password, user.password)
        if (!ismatch) {
            res.json({ sucess: false, message: "password is not matching" })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
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
        res.clearCookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',

        })
        return res.json({ success: true, message: "user logged out" });
    } catch (error) {
        console.error(error);
    }
}