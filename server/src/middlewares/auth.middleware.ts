import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401).json({ message: "Unauthorized" })
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
        req.user = decodedToken.user_id;
        next();
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" });
    }
}