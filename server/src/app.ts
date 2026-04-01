import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import oauthRoutes from './routes/oauth.routes.js'
import reviewRoutes from './routes/review.routes.js';

dotenv.config();

const app: express.Application = express();

app.use(express.json())


app.get('/',(req:Request,res:Response)=>{
    res.send('Portfolio Backend is running');
})

app.use('/api/auth', oauthRoutes);
app.use('/api/reviews',reviewRoutes)

export default app;