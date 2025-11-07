import mongoose from 'mongoose';

const reviewSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    stars:{
        type:Number,
        required:true
    },
    deleteKey:{
        type:String,
        required:true
    }
})

const Review= mongoose.model('Review',reviewSchema)
export default Review