import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import oauthRoutes from './routes/oauth.routes.js'
import reviewRoutes from './routes/review.routes.js';
import blogRoutes from './routes/Blog.Routes.js'
import visitorRoutes from './routes/Visitor.routes.js';

dotenv.config();

const app: express.Application = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://www.ikeshav.in'],
  credentials: true,
}));
app.use(express.json())


app.get('/',(req:Request,res:Response)=>{
    res.send('Portfolio Backend is running');
})

app.use('/api/auth', oauthRoutes);
app.use('/api/reviews',reviewRoutes)
app.use('/api/blogs',blogRoutes)
app.use('/api/visitor',visitorRoutes)

export default app;