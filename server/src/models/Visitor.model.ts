import mongoose from "mongoose";



const visitorSchema= new mongoose.Schema({
    visitorCount:{
        type:Number
    }
})

const Visitor= mongoose.model("Visitor",visitorSchema);
export default Visitor;