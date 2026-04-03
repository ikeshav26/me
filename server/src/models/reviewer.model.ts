import mongoose from "mongoose";



const reviewSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    avatarUrl:{
        type:String,
        required:true
    },
    googleProviderId:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    isAuthor:{
        type:Boolean,
        default:false
    }
})


const Reviewer=mongoose.model('Reviewer',reviewSchema);
export default Reviewer;