import express from 'express'
import { addReview, allReviews } from '../controller/review.controller.js'

const router=express.Router()


router.post('/add-review',addReview)
router.get('/all-reviews',allReviews)


export default router