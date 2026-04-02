import mongoose from "mongoose";



const BlogSchema=new mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Blog=mongoose.model("Blog",BlogSchema);
export default Blog;