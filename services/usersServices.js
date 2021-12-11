const userModel = require('../model/usersModel.js');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const { json } = require('express');
const FacebookStrategy = require('passport-facebook').Strategy
const passport = require('passport')



exports.getAllUsers=(req,res)=>{
    if(req.query.q)
    {
        userModel.find({firstName:{$regex: new RegExp(req.query.q)}})
       // .or({lastName:{$regex: new RegExp(req.query.q)}})
        .then((user)=>{

            if(user.length===0){
                userModel.find({lastName:{$regex: new RegExp(req.query.q)}})
                // .or({lastName:{$regex: new RegExp(req.query.q)}})
                 .then((last)=>{
         
                    if(last.length===0){
                        userModel.find({email:{$regex: new RegExp(req.query.q)}})
                        .then((email)=>{
                            res.json({
                                message:'All Shows have been returned',
                                data:email,
                                length:email.length
                
                                
                            })
                        })
                    }else{
                     res.json({
                         message:'All Shows have been returned',
                         data:last,
                         length:last.length
         
                         
                     })

                    }
                 })
            }else{
                res.json({
                    message:'All Shows have been returned',
                    data:user,
                    length:user.length
    
                    
                })
            }
          
        })
        .catch(err=>{
            res.status(404).json({
                message:'All Shows could not be returned',
                data:err
            }) 
           })
        }else{
    userModel.find()
    .then((movie)=>{


        res.json({
            message:'All Movies have been returned',
            data:movie,
            length:movie.length
        })
    })
    .catch(err=>{
        res.json({
            message:'Movie could not be returned',
            data:err
        }) 
       })
    }
    
}



exports.getAUser=(req,res)=>{
    
    // if(req.query.itemID){

    //     userModel.find({cart :{_id:req.query.itemID}})
    //     .where({_id:req.params._id})
    //     .then((movie)=>{
    
    
    //         res.json({
    //             message:`All ${req.query.itemID}have been returned`,
    //             data:movie,
    //             length:movie.length,
    //             search:"kkkk"
    //         })
    //     })
    //     .catch(err=>{
    //         res.json({
    //             message:'Movie could not be returned',
    //             data:err
    //         }) 
    //        })
    // }else{
   

    userModel.findById(req.params.id)
    .then((movie)=>{

        if(movie){

            res.json({
                message:`Movie with id:${req.params.id} has been returned`,
                data:movie,
                cc:"findbyid"
            })

        }else{

            res.status(404).json({
                message:`Movie with id:${req.params.id} was not returned`,
              
            })
        }
      
       
    })
    .catch(err=>{
        res.status(404).json({
         message:`Movie with id:${req.params.id} was not found`,
         error:err
        }) 
     })
    
}


exports.createAUser = async (req,res)=>{
      
    const newMovie = new userModel(req.body)

    const schema = Joi.object({
        email:Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
        
        password:Joi.string()
        .alphanum()
        .min(8)
        .required()
    })

        try
        {

           

            const value = await schema.validateAsync(req.body);

            const user = await newMovie.save()

            const salt = await  bcrypt.genSalt(10)
            
            const hash=  await bcrypt.hash(user.password,salt)
                
            user.password = hash
                        
            const newUser = await user.save()
                    
            const sgMail = require('@sendgrid/mail')
            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            const msg = {
                to: `${newUser.email}`, // Change to your recipient
                from: 'jpatterson@sheppard.tt', // Change to your verified sender
                subject: 'Thank You For Joining',
                text: " ",
                html: `Thank You ${newUser.firstName} ${newUser.lastName} for joining.
                You have successfully signed up for movieHut`
            }

            await sgMail
            .send(msg)
            
            console.log('it not working')
            
            res.json({
                    message:'User was created',
                    data:newUser
                    
                })

            console.log(newUser.email)
            console.log('Email sent');
            
        }

        catch(err)
        {


           res.status(500).json({
               err : err.message
           })
        }
   
               

        
 
}

exports.deleteAUser =async(req,res)=>{
   
   
    try{
        const movie = await userModel.findByIdAndDelete({_id:req.params.id})
   
        res.json({
            message:`${req.params.id} was deleted`,
            data:movie,
            length:movie.length
        })
    }
    catch(err)
    {
        res.status(404).json({
            message:`Movie ${req.params.id} could not be deleted`,
            error:err
           }) 
    }
  
}








console.log()

exports.updateAUser=(req,res)=>{

    const update = req.body
    userModel.findByIdAndUpdate(req.params.id,update,{new:true})
    .then((movie)=>{
        res.json({
            message:`${req.params.id } has been updated`,
            data:movie
        })
    })
    .catch(err=>{
        res.status(404).json({
            message:err
        }) 
    })
}


exports.userAuthentication=(req,res)=>{

    userModel.findOne()
    .where("email").equals(req.body.email)
    .then(user =>{
        
        if(user)
        {

            bcrypt.compare(req.body.password,user.password)
            .then((value)=>{
                if(value){
                    console.log(user)
                    const token = jwt.sign({ 
                        _id: user._id,
                        firstName:user.firstName,
                        lastName:user.lastName,
                        email:user.email ,
                        level:user.level
                    }, process.env.JWT_TOKEN);
                    console.log(token)
                       res.header('x-auth-header',token).json({
                            message:"Your're in",
                            token:token,
                            
                         })
                }
                else{
                    res.status(400).json({
                        message:"Email/Password is incorrect"
                     })
                }
            })
        }
        else{
            res.status(400).json({
                message:"email is invalid"
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message:err
        })
    })
}

exports.facebookAuthentication = (req,res)=>{

   
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/moviehut"
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    ))
    
    passport.authenticate('facebook')

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    
    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
        return done(null,user)
    });

 
}

// exports.facebookAuthCallBack = (req,res)=>{
//     passport.authenticate('facebook')
//     .then(res =>{
//         if(! passport.authenticate('facebook')){
//             res.json({
//                 value:false
//             })
//         }else{
//             res.json({
//                 value:true
//             })
//         }
        
//     })
//     .catch(err=>{
//         res.status(500).json({
//             message:err
//         })
//     })
    
// }

