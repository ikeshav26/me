import { rateLimit } from 'express-rate-limit';

export const createLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 3,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { message: "Too many requests, please try again after a minute." }
});
