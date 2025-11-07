import express from 'express'
import { addReview, allReviews, deleteReview } from '../controller/review.controller.js'

const router=express.Router()


router.post('/add-review',addReview)
router.get('/all-reviews',allReviews)
router.post('/delete-review',deleteReview)


export default router