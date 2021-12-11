var GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');


const googleLogin = () => {

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        done(null,profile)
      }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    
    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
         done(null,user)
    });

}   

module.exports = googleLogin;
