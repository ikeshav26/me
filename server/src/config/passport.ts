import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';
import dotenv from 'dotenv';
import Reviewer from '../models/reviewer.model.js';

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.API_URL}/auth/google/callback`,
    },
    async (accessToken: string, refreshToken: string, profile: any, done: (err: any, user?: any) => void) => {
      try {
        const email =
          profile.emails && profile.emails.length > 0
            ? profile.emails[0].value
            : null;
        const avatarUrl =
          profile.photos && profile.photos.length > 0
            ? profile.photos[0].value
            : null;

        if (!email) {
          return done(new Error('No email provided by Google'), null);
        }

        let user = await Reviewer.findOne({
           googleProviderId: profile.id,
        });

        if (user) {
          if (avatarUrl) {
            user = await Reviewer.findByIdAndUpdate(
              user._id,
              { avatarUrl: avatarUrl },
              { new: true }
            );
          }
        } else {
          user = await Reviewer.create({
              name: profile.displayName || email.split('@')[0],
              email: email,
              googleProviderId: profile.id,
              avatarUrl: avatarUrl || '',
          });
        }

        return done(null, user);
      } catch (err) {
        console.error('Google OAuth error', err);
        return done(err, null);
      }
    }
  )
);

export default passport;