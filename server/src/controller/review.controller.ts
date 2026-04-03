import type { Request, Response } from "express";
import Reviewer from "../models/reviewer.model.js";
import Review from "../models/review.model.js";



export const createReview=async(req:Request,res:Response)=>{
    try{
        const {googleProviderId, userId, reviewText}=req.body;
        if((!googleProviderId && !userId) || !reviewText){
            return res.status(400).json({message:'Please try again later... no identification provided'});
        }

        let findReviewer;
        if (googleProviderId) {
            findReviewer = await Reviewer.findOne({ googleProviderId });
        } else if (userId) {
            findReviewer = await Reviewer.findById(userId);
        }

        if(!findReviewer){
            return res.status(404).json({message:'Please try again later... no reviewer found'});
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
        const allReviews=await Review.find().populate('reviewedBy','name avatarUrl googleProviderId isAuthor');
        // Filter out reviews where reviewedBy is null (orphaned reviews)
        const reviews = allReviews.filter(review => review.reviewedBy !== null);
        
        // Sort: Author messages first, then by date descending
        const sortedReviews = reviews.sort((a: any, b: any) => {
            const aIsAuthor = a.reviewedBy?.isAuthor || false;
            const bIsAuthor = b.reviewedBy?.isAuthor || false;
            
            if (aIsAuthor && !bIsAuthor) return -1;
            if (!aIsAuthor && bIsAuthor) return 1;
            
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        res.status(200).json({reviews: sortedReviews});
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
        // Support getting googleProviderId from body, query or headers
        const googleProviderId = req.body.googleProviderId || req.query.googleProviderId || req.headers['x-google-provider-id'];
        
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