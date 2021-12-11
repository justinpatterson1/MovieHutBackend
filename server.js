const movieController = require('./controller/movieController.js')
const usersController = require('./controller/usersController.js')
const authController = require('./controller/authController.js')

const {db} = require('./db/movies-seed')
const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const session =  require('express-session')
const passport = require('passport');
const passportFB = require('./passport/passport_facebook')
const passportGoogle = require('./passport/passport-google')
const cookieSession = require('cookie-session')



const app = express();

if(process.env.NODE_ENV!="production")
{
    require("dotenv").config({path:"config/Keys.env"})
}

passportFB()
passportGoogle()

app.use(express.json());

app.use(fileUpload());

app.use(cookieSession({
    name:'session',
    keys:['hi'],
    maxAge: 24* 60 * 60 * 100
}))

app.use(passport.initialize())

app.use(passport.session());

app.use(cors({
    origin:process.env.FRONT_END
}))

app.use("/movie",movieController)
app.use("/users",usersController)
app.use("/auth",authController)
// app.use(passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:3000/auth/facebook/callback"
//   },
//   function(accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ facebookId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ))
// )

const PORT = process.env.PORT;

app.listen(PORT,()=>{

    console.log(`Application is running on port ${PORT}`)
    mongoose.connect(process.env.MONGO_DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>{
        console.log('your in')
        //db();
    })
    .catch(err=>{
        console.log('you failed'+err)
    })

})