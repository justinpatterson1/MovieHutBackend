const FacebookStrategy = require('passport-facebook').Strategy
const passport = require('passport')
const User = require('../model/usersModel')

const FacebookLogin = ()=>{

   
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/moviehut"
      },
      function(accessToken, refreshToken, profile,done) {
        done(null, profile)
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

module.exports = FacebookLogin