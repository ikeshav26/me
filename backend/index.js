import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/DB.js';


const app=express();
dotenv.config();
connectDB()


app.get('/',(req,res)=>{
    res.send('Hello World!')
})



app.listen((process.env.PORT),()=>{
    console.log(`Servver running on ${process.env.PORT}`)
})