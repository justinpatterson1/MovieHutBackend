const movieModel = require('../model/movieModel.js')


exports.getAllMovies=(req,res)=>{
    movieModel.find()
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

exports.getAMovie=(req,res)=>{
    
   
    movieModel.findById(req.params.id)
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

exports.createAMovie =(req,res)=>{
    const newMovie = new movieModel(req.body)
    newMovie.save()
    .then(movie=>{
        res.json({
            message:'Movie was created',
            data:movie
        })
    })
    .catch(err=>{
        res.status(404).json({
         message:'Movie was not created',
         error:err
        }) 
     })
}

exports.deleteAMovie =(req,res)=>{
    movieModel.findByIdAndDelete({_id:req.params.id})
    .then((movie)=>{
        res.json({
            message:`${req.params.id} was deleted`
        })
    })
    .catch(err=>{
        res.status(404).json({
            message:`Movie ${req.params.id} could not be deleted`,
            error:err
           }) 
    })
}


exports.updateAMovie=(req,res)=>{

    const update = req.body
    movieModel.findByIdAndUpdate(req.params.id,update,{new:true})
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