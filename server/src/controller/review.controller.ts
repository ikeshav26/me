import type { Request, Response } from "express";
import Reviewer from "../models/reviewer.model.js";
import Review from "../models/review.model.js";



export const createReview=async(req:Request,res:Response)=>{
    try{
        const {googleProviderId,reviewText}=req.body;
        if(!googleProviderId || !reviewText){
            return res.status(400).json({message:'Please try again little later...'});
        }

        const findReviewer=await Reviewer.findOne({googleProviderId});
        if(!findReviewer){
            return res.status(404).json({message:'Please try again little later...'});
        }

        const newReview=await Review.create({
            reviewedBy:findReviewer._id,
            reviewText
        });
        res.status(201).json({ message: 'Review created successfully', review: newReview });
    }catch(err){
        console.error('Error creating review', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const getAllReviews=async(req:Request,res:Response)=>{
    try{
        const reviews=await Review.find().populate('reviewedBy','name avatarUrl');
        res.status(200).json({reviews});
    }catch(err){
        console.error('Error fetching reviews', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}


export const deleteReview=async(req:Request,res:Response)=>{
    try{
        const {reviewId}=req.params;
        if(!reviewId){
            return res.status(400).json({message:'Review ID is required'});
        }
        const {googleProviderId}=req.body;
        if(!googleProviderId){
            return res.status(400).json({message:'Google Provider ID is required'});
        }

        const findReviewer=await Reviewer.findOne({googleProviderId});
        if(!findReviewer){
            return res.status(404).json({message:'Reviewer not found'});
        }

        const review=await Review.findById(reviewId);
        if(!review){
            return res.status(404).json({message:'Review not found'});
        }

        if(review.reviewedBy.toString()!==findReviewer._id.toString()){
            return res.status(403).json({message:'You are not authorized to delete this review'});
        }

        await Review.findByIdAndDelete(reviewId);
        res.status(200).json({message:'Review deleted successfully'});
    }catch(err){
        console.error('Error deleting review', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}