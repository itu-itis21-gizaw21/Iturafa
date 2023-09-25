import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    yeni:{
        type: Boolean,
        default: false,
    },
    gender:{
        type: String,
        default: "",
    },
    postUserId: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date, 
        default: new Date()
    },
    likes: {
        type: [],
        of: Boolean,
    },
    comments: {
        type: [],
        of: String,
    },
    likedAt: {
        type: Date,
        default: new Date()
    },
    commentedAt: {
        type: Date,
        default: new Date()
    },
    }, {timestamps: true} 
);

const Post = mongoose.model("Post", PostSchema);

export default Post;
