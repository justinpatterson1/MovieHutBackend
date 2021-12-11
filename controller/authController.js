const express = require('express')
const router = express.Router()
const passport = require ('passport')


router.get('/facebook',passport.authenticate("facebook"))

router.get ('/facebook/moviehut',passport.authenticate('facebook',{
    successRedirect:'http://localhost:3000/',
    failureRedirect:'http://localhost:3000/auth'
}))

router.get('/google',passport.authenticate("google",{scope:["profile"]}))

router.get ('/google/callback',passport.authenticate('google',{
    successRedirect:'http://localhost:3000/',
    failureRedirect:'http://localhost:3000/auth'
}))
module.exports = router;