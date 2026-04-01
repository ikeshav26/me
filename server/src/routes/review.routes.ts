import express from 'express';
import { createReview, deleteReview, getAllReviews } from '../controller/review.controller.js';



const router:any=express.Router()


router.post('/create',createReview);
router.get('/all',getAllReviews);
router.delete('/delete/:reviewId',deleteReview);

export default router;