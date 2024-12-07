const Post = require('../models/Post')
const User = require('../models/User')
const createPost = async (req, res) => {
    try {
        const { description, image, postedBy } = req.body;
        if (!postedBy || !description) {
            return res.status(400).json({ error: "Postedby and text fields are required" });
        }
        const user = await User.findById(postedBy);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized to create post" });
        }
        const newpost = new Post({ description, image, postedBy });
        const savepost = await newpost.save();
        user.posts.push(savepost);
        res.status(201).json(savepost);
    } catch (error) {
        console.error(error);
    }
}
const likeUnlikePost = async (req, res) => {
    try {
        const { id: postId } = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        const userLikedPost = post.votes.includes(userId);
        if (userLikedPost) {
            await Post.updateOne({ _id: postId }, { $pull: { votes: userId } });
            res.status(200).json({ message: "Post unliked successfully" });
        } else {
            post.votes.push(userId);
            await post.save();
            res.status(200).json({ message: "Post liked successfully" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
const deletePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}

		if (post.postedBy.toString() !== req.user._id.toString()) {
			return res.status(401).json({ error: "Unauthorized to delete post" });
		}

		if (post.img) {
			const imgId = post.img.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(imgId);
		}

		await Post.findByIdAndDelete(req.params.id);

		res.status(200).json({ message: "Post deleted successfully" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
const getPosts = async(req,res)=> {
    try {
        const posts = await Post.find();
        res.status(201).json(posts);
    } catch (error) {
        console.error(error);
    }
}
const getPost = async(req,res)=> {
    try {
        const post = await Post.findById(req.params.id);
        res.status(201).json(post);
    } catch (error) {
        console.error(error);
    }
}
const getFeedPosts = async (req, res) => {
	try {
		const userId = req.user._id;
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

		const following = user.following;

		const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 });

		res.status(200).json(feedPosts);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
module.exports = { createPost,likeUnlikePost,deletePost,getPosts,getPost,getFeedPosts}