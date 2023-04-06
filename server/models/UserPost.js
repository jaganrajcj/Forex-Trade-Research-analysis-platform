import mongoose from "mongoose";

const UserPostSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "user"
        },
        date: {
            type: Date,
            default: Date.now
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        bias: {
            type: String,
            required: true
        },
        market: {
            type: String,
            required: true
        },
        imageSource: {
            type: String,
            required: true
        },
        upVotes: {
            type: Number,
            default: 0
        },
        downVotes: {
            type: Number,
            default: 0
        },
        comments: []
    }
)
const UserPost = mongoose.model('userPost', UserPostSchema)
export default UserPost