const userModel = require('../model/usersModel.js');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');


exports.getAllUsers=(req,res)=>{
    
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


exports.createAUser =(req,res)=>{
    const newMovie = new userModel(req.body)

   
    newMovie.save()
    
    .then(user=>{

        bcrypt.genSalt(10)
        .then((salt)=>{
            bcrypt.hash(user.password,salt)
            .then((hash)=>{
                user.password = hash
                
                user.save()
                .then((newUser)=>{
                    // res.json({
                    //     message:'User was created',
                    //     data:newUser

                        
                    //})
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
                    sgMail
                    .send(msg)
                    .then(() => {
                        console.log('it not working')
                        
                        res.json({
                                message:'User was created',
                                data:newUser
        
                                
                            })

                            console.log(newUser.email)
                        console.log('Email sent')
                    })
                    .catch((error) => {
                        console.error(error)
                    })

                })
            })
        })
        
    })
    .catch(err=>{
        res.status(404).json({
         message:'User was not created',
         error:err
        }) 
     })
}

exports.deleteAUser =(req,res)=>{
    userModel.findByIdAndDelete({_id:req.params.id})
    .then((movie)=>{
        res.json({
            message:`${req.params.id} was deleted`,
            data:movie,
            length:movie.length
        })
    })
    .catch(err=>{
        res.status(404).json({
            message:`Movie ${req.params.id} could not be deleted`,
            error:err
           }) 
    })
}


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



