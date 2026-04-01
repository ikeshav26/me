import mongoose from "mongoose";



const reviewSchema=new mongoose.Schema({
    reviewedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Reviewer',
        required:true
    },
    reviewText:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})


const Review=mongoose.model('Review',reviewSchema);
export default Review;