import mongoose from 'mongoose';
import dotenv from 'dotenv'

dotenv.config()

const connectDB=()=>{
    try{
        mongoose.connect(process.env.MONGO_URI)
        console.log("Databse connected succesfully")
    }catch(err){
        console.log(err)
        console.log("Error in connecting database")
    }
}

export default connectDB