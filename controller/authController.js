const express = require('express')
const router = express.Router()
const passport = require ('passport')


router.get('/facebook',passport.authenticate("facebook"))


router.get ('/facebook/moviehut',passport.authenticate('facebook',{

    successRedirect:'http://localhost:3000/',
    failureRedirect:'http://localhost:3000/auth'
}),(req,res)=>{res.json({
    value:req.session.populated
})})

router.get('/google',passport.authenticate("google",{scope:["profile"]}))

router.get ('/google/callback',passport.authenticate('google',{
    successRedirect:'http://localhost:3000/',
    failureRedirect:'http://localhost:3000/auth'
}))

router.post('/logout',(req,res)=>{
    req.session = null;
})
module.exports = router;