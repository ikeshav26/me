import express from 'express';
import { sendMessage, getAllMessages, getMessage, deleteMessage } from '../controller/message.controller.js';
import { userAuth } from '../middlewares/auth.middleware.js';
import { createLimiter } from '../middlewares/rateLimit.middleware.js';

const router: express.Router = express.Router();

router.post('/create', createLimiter, sendMessage);
router.get('/all', userAuth, getAllMessages);
router.get('/:id', userAuth, getMessage);
router.delete('/:id', userAuth, deleteMessage)

export default router;
