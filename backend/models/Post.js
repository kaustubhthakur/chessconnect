const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    votes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
},
 {
    timestamps: true,
})
module.exports = mongoose.model("Post", PostSchema);