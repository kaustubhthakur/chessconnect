const Post = require('../models/Post')
const createPost = async(req,res)=> {
    try {
        const newpost = new Post(req.body);
        const savepost = await newpost.save();
        res.status(201).json(savepost);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {createPost}