import type { Request, Response } from "express";
import passport from '../config/passport.js';
import jwt from 'jsonwebtoken'

export const googleOauthController = (req:Request, res:Response, next:Function) => {
  try {
    passport.authenticate('google', { session: false }, (err:Error, user:any) => {
      if (err) {
        console.error('Google OAuth error', err);
        return res.redirect(
          `${process.env.CLIENT_URL}/login?error=oauth_failed&message="Authentication failed"`
        );
      }

      if (!user) {
        return res.redirect(
          `${process.env.CLIENT_URL}/login?error=oauth_failed&message="No user found"`
        );
      }

      res.redirect(
        `${process.env.CLIENT_URL}/guestbook/?oauth=success&token=${
          user._id
        }&user=${encodeURIComponent(JSON.stringify({ 
          userId: user._id, 
          name: user.name, 
          email: user.email, 
          avatarUrl: user.avatarUrl 
        }))}`
      );
    })(req, res, next);
  } catch (err) {
    console.error('OAuth Controller error', err);
    return res.redirect(
      `${process.env.CLIENT_URL}/guestbook/?error=oauth_failed&message="Internal server error"`
    );
  }
};