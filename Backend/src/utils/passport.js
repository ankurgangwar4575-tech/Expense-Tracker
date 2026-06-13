const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const userModel = require("../models/user.model.js");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const isUserExists = await userModel.findOne({
          email: profile.emails[0].value,
        });
        if (isUserExists) {
          return done(null, isUserExists);
        }
        const user = await userModel.create({
          fullName: profile.displayName,
          email: profile.emails[0].value,
          userName: profile.emails[0].value.split("@")[0],
          profilePhoto: profile.photos[0].value,
          password: Math.random().toString(36).slice(-8),
          isGoogleUser: true,
        });
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
