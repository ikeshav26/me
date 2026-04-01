import express, { type Request, type Response } from 'express';
import dotenv from 'dotenv';
import oauthRoutes from './routes/oauth.routes.js'

dotenv.config();

const app: express.Application = express();

app.use(express.json())


app.get('/',(req:Request,res:Response)=>{
    res.send('Portfolio Backend is running');
})

app.use('/api/auth', oauthRoutes);

export default app;