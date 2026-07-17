import express from 'express';
import {
  createReview,
  deleteReview,
  getAllReviews,
} from '../controller/review.controller.js';
import { createLimiter } from '../middlewares/rateLimit.middleware.js';

const router: any = express.Router();

router.post('/create', createLimiter, createReview);
router.get('/all', getAllReviews);
router.delete('/delete/:reviewId', deleteReview);

export default router;
