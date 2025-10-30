import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/DB.js';
import routes from './src/routes/review.routes.js';


const app=express();
dotenv.config();
connectDB()

app.use(express.json())

app.get('/',(req,res)=>{
    res.send('Hello World!')
})
app.use('/api',routes)



app.listen((process.env.PORT),()=>{
    console.log(`Servver running on ${process.env.PORT}`)
})