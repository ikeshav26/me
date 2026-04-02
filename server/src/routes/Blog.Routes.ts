import express from 'express'
import { createBlog, getAllBlogs, getBlogById } from '../controller/Blog.controller.js';

const router:any=express.Router();

router.post("/create",createBlog);
router.get("/all",getAllBlogs);
router.get("/:id",getBlogById);

export default router;