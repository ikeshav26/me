import express from "express";
import Visitor from "../models/Visitor.model.js"



const router: express.Router = express.Router()



router.get('/increment',async(req,res)=>{
    try{
        const visitor= await Visitor.findOne();
        const visitorCount= visitor?.visitorCount || 0;
        if(visitor){
            visitor.visitorCount= visitorCount+1;
            await visitor.save();
        }else{
            const newVisitor= new Visitor({visitorCount:1});
            await newVisitor.save();
        }
        res.json({message:"Visitor incremented successfully"});
    }catch(err){
        res.status(500).json({message:"Internal Server Error"})
    }
})


router.get('/count',async(req,res)=>{
    try{
        const visitor= await Visitor.findOne();
        const visitorCount= visitor?.visitorCount || 0;
        res.json({visitorCount});
    }catch(err){
        res.status(500).json({message:"Internal Server Error"})
    }
})


export default router;