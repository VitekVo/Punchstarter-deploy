import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/user.model.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "https://punchstarter-deploy.onrender.com/auth/google/callback", // URL pro přesměrování po přihlášení
        },
        async (accessToken, refreshToken, profile, done) => {
            try {

                let user = await User.findOne({ googleId: profile.id });

                if (!user) {

                    user = await User.create({
                        googleId: profile.id,
                        username: profile.displayName,
                    });
                }

                done(null, user);
            } catch (err) {
                done(err, null);
            }
        }
    )
);


passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

export default passport;