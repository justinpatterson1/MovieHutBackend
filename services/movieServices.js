const movieModel = require('../model/movieModel.js');
const { v4: uuidv4 } = require('uuid');


exports.getAllMovies=(req,res)=>{
    if(req.query.q)
    {
        movieModel.find({name:{$regex: new RegExp(req.query.q)}})
        .then((movie)=>{
            res.json({
                message:'All Shows have been returned',
                data:movie,
                length:movie.length
            })
        })
        .catch(err=>{
            res.status(404).json({
                message:'All Shows could not be returned',
                data:err
            }) 
           })
        }else if(req.query.type==='Tv Show'){

            if(req.query.page){

            
                movieModel.find({type:'Tv Show'})
                   .skip((req.query.page -1)*18)
                   .limit(18)
                .then((movie)=>{
                   return res.json({
                        message:'All Tv Shows have been returned',
                        data:movie,
                        length:movie.length
                    })
         })
        .catch(err=>{
            res.status(404).json({
                message:'Tv Shows could not be returned',
                data:err
            }) 
           })
            } else if(req.query.sort){
                if(req.query.slideAmt){
                    movieModel.find({type:'Tv Show'})
                    .sort({release_date:req.query.sort})
                    .skip((req.query.slideAmt -1)*5)
                    .limit(5)
                    .then((movie)=>{
                        res.json({
                            message:"All movies have been returned",
                            data:movie,
                            length:movie.length,
                            mm:'hi'
                        })
                        
                    })
                    .catch(err=>{
                        res.status(404).json({
                            message:'Error returning movies',
                            data:err
            
                        })
                    })
               
                } else if(req.query.p){
                movieModel.find({type:'Tv Show'})
                .sort({release_date:req.query.sort})
                .skip((req.query.p -1)*18)
                .limit(18)
                .then((movie)=>{
                    res.json({
                        message:"All movies have been returned",
                        data:movie,
                        length:movie.length,
                        mm:'hi'
                    })
                    
                })
                .catch(err=>{
                    res.status(404).json({
                        message:'Error returning movies',
                        data:err
        
                    })
                })
           
            }
        }else if(req.query.featured){
        
            movieModel.find({featured:'true'})
            .where({type:'Tv Show'})
            .skip((req.query.slideAmt -1)*5)
            .limit(5)
            .then((movie)=>{
                res.json({
                    message:"All featured movies have been returned",
                    data:movie,
                    length:movie.length
                })
                
            })
            .catch(err=>{
                res.status(404).json({
                    message:'Error returning movies',
                    data:err
    
                })
            })
        }else{

            movieModel.find({type:'Tv Show'})
            .limit(18)
            .then((movie)=>{
                res.json({
                    message:'All Tv Shows have been returned',
                    data:movie,
                    length:movie.length
                })
            })
            .catch(err=>{
                res.status(404).json({
                    message:'Tv Shows could not be returned',
                    data:err
                }) 
               })
        }

        
   
    }  
    else if(req.query.type==='Movie'){
        if(req.query.sort){
            if(req.query.slideAmt ){
            movieModel.find({type:'Movie'})
            .sort({release_date:req.query.sort})
            .skip((req.query.slideAmt -1)*5)
            .limit(5)
            .then((movie)=>{
                res.json({
                    message:"All movies have been returned",
                    data:movie,
                    length:movie.length
                })
                
            })
            .catch(err=>{
                res.status(404).json({
                    message:'Error returning movies',
                    data:err
    
                })
            })
         }else if(req.query.page){
                movieModel.find({type:'Movie'})
                .sort({release_date:req.query.sort})
                .skip((req.query.page -1)*18)
                .limit(18)
                .then((movie)=>{
                    res.json({
                        message:"All movies have been returned",
                        data:movie,
                        length:movie.length
                    })
                    
                })
                .catch(err=>{
                    res.status(404).json({
                        message:'Error returning movies',
                        data:err
        
                    })
                })
            }
        }
        else if(req.query.page){
        movieModel.find({type:'Movie'})
        .skip((req.query.page -1)*18)
        .limit(18)
        .then((movie)=>{
            res.json({
                message:"All movies have been returned",
                data:movie,
                length:movie.length
            })
            
        })
        .catch(err=>{
            res.status(404).json({
                message:'Error returning movies',
                data:err

            })
        })
       
    }else if(req.query.featured==='true'){
        movieModel.find({featured:'true'})
        .where({type:'Movie'})
        .skip((req.query.slideAmt -1)*5)
        .limit(5)
        .then((movie)=>{
            res.json({
                message:"All featured movies have been returned",
                data:movie,
                length:movie.length,
            
            })
            
        })
        .catch(err=>{
            res.status(404).json({
                message:'Error returning movies',
                data:err

            })
        })
    }else{
        movieModel.find({type:'Movie'})
        .limit(18)
        .then((movie)=>{
            res.json({
                message:"All movies have been returned",
                data:movie,
                length:movie.length
            })
            
        })
        .catch(err=>{
            res.status(404).json({
                message:'Error returning movies',
                data:err

            })
        })
    }
      
    } 
    else{
        if(req.query.promoted==='true'){
            movieModel.find({promoted:'true'})
            .then((movie)=>{
                res.json({
                    message:'All promoted shows have been returned',
                    data:movie,
                    length:movie.length
                })
            })
            .catch(err=>{
                res.status(404).json({
                    message:'All promoted shows could not be returned',
                    data:err
                }) 
               })
            }else{

               
                movieModel.find()
                .then((movie)=>{
                    res.json({
                        message:'All Shows have been returned',
                        data:movie,
                        length:movie.length
                    })
                })
                .catch(err=>{
                    res.status(404).json({
                        message:'All Shows could not be returned',
                        data:err
                    }) 
                   })
                
            }
            }

           

           
                   

        

      
    
}


exports.searchMovies = (req,res)=>{
    
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

   


    // const newMovie = new movieModel(req.body)
    // newMovie.files = req.files
    // console.log("files:"+newMovie.files)
    // console.log(newMovie)
    // newMovie.save()

    
    // .then((movie)=>{
    
            
    //             res.status(201).json({
    //                 message:'Movie was created',
    //                 data:movie
    //             })


        
            
           
    //     })
    
    // .catch(err=>{
    //     res.status(500).json({
    //      message:'Movie was not created',
    //      error:err
    //     }) 
    //  })

   

        const AWS = require('aws-sdk');
    
        const s3 = new AWS.S3({
            accessKeyId: process.env.ID,
            secretAccessKey: process.env.SECRET
        });
    
    
        const newMovie = new movieModel(req.body)
        
       
        newMovie.save()
        .then((movie)=>{
          
            const fileName = `${uuidv4()}_${req.files.img.name}`
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: fileName,
                Body:req.files.img.data
            };
            console.log("Blah")
            
            s3.upload(params, function(err, data) {
                if (err) {
                    throw err;
                }
    
                
    
                newMovie.img = data.Location
                newMovie.save()
                .then((movie)=>{
                    res.json({
                        message:'Movie was created',
                        data:movie
                    })
    
    
                })
    
                
                console.log(`File uploaded successfully. ${data.Location}`);
            });
        
        })
        .catch(err=>{
            res.status(500).json({
             message:'Movie was not created',
             error:err
            }) 
         })
    }


exports.deleteAMovie =(req,res)=>{
    movieModel.findByIdAndDelete(req.params.id)
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

exports.getAllShows=(req,res)=>{
    movieModel.find({type:req.params.type})
    .then((movie)=>{
        res.json({
            message:`All ${req.params.type} have been returned`,
            data:movie,
            length:movie.length
        })
    })
    .catch(err=>{
        res.json({
            message:`${req.params.type} could not be returned`,
            data:err
        }) 
       })
}



