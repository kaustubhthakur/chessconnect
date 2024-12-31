const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "",
    },
    userId: {
        type: String,
        required: true,
    },
    votes: {
        type: [String],
        default: [],
    },
},
{
    timestamps:true,
}
)
module.exports = mongoose.model("Post",PostSchema);