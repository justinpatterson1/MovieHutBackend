const userModel = require('../model/usersModel.js');
const bcrypt = require("bcryptjs")


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
    
   
    userModel.findById(req.params.id)
    .then((movie)=>{

        if(movie){

            res.json({
                message:`Movie with id:${req.params.id} has been returned`,
                data:movie
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
                    res.json({
                        message:'User was created',
                        data:newUser
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
            res.json({
                message:"email is valid"
            })
        }
        else{
            res.json({
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

