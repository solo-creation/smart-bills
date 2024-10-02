import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserService from "../services/userService.mjs";

const userService = new UserService();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GCP_OAUTH_CLIENT_ID,
      clientSecret: process.env.GCP_OAUTH_CLIENT_SECRET,
      callbackURL: process.env.GCP_OAUTH_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await userService.FindOrCreateUser(profile); // Implement this in UserService
        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

const authenticateWithPassport = (event) => {
  return new Promise((resolve, reject) => {
    passport.authenticate("google", (error, user) => {
      if (error) {
        return reject(error);
      }
      resolve(user);
    });
  })(event);
};

export { passport, authenticateWithPassport };
