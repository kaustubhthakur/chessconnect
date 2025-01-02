const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
       required:true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
    },
    votes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
},
{
    timestamps:true,
}
)
module.exports = mongoose.model("Post",PostSchema);