const usersServices =  require('../services/usersServices');
const usersMiddleware = require('../middleware/usersMiddleware')
const userFormValidation  = require('../middleware/authValidation')
const passport = require('passport');
const express = require('express');
const router = express.Router();




router.get("/",usersServices.getAllUsers)
router.post("/", usersServices.createAUser)
router.get("/:id",usersServices.getAUser)
router.delete("/:id",usersServices.deleteAUser)
router.put("/:id",usersServices.updateAUser)
router.post("/auth",usersServices.userAuthentication)
router.get("/auth/facebook", passport.authenticate('facebook',{successRedirect:'/',failureRedirect: '/' }/*usersServices.facebookAuthentication*/))
router.get("/auth/facebook/moviehut", passport.authenticate('facebook', { failureRedirect: '/' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/auth');
})
router.delete("/:id",usersServices.deleteAUser)

module.exports = router;
