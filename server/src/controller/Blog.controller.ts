import type { Request, Response } from "express";
import Blog from "../models/Blog.model.js";



export const createBlog=async(req:Request,res:Response)=>{
    try{
        const {subject,description}=req.body;
        if(!subject || !description){
            return res.status(400).json({message:"All fields are required"})
        }
        const blog=new Blog({
            subject,
            description
        })
        await blog.save();
        return res.status(201).json({message:"Blog created successfully",blog})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal server error"})  
    }
}


export const getAllBlogs=async(req:Request,res:Response)=>{
    try{
        const blogs=await Blog.find();
        return res.status(200).json({message:"Blogs fetched successfully",blogs})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal server error"})  
    }
}

export const getBlogById=async(req:Request,res:Response)=>{
    try{
        const {id}=req.params;
        const blog=await Blog.findById(id);
        return res.status(200).json({message:"Blog fetched successfully",blog})
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Internal server error"})  
    }
}