const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    posts: {
        type: [String],
        default: [],
    },
    followers: {
        type: [String],
        default: [],
    },
    following: {
        type: [String],
        default: [],
    },
    profilePic: {
        type: String,
        default: "",
    },
    description: {
        type: String,
        default: "",
    }

},
    {
        timestamps: true,
    })
module.exports = mongoose.model("User", UserSchema);