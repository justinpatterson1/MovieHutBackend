const mongoose = require('mongoose');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const { Schema } = mongoose;

  const movieSchema = new Schema({
   name:{
       type:String,
       require:true,
   },

   img:{
     type:String,
     default:"default.jpg",
     require:true
   },
   poster:{
    type:String,
    default:"default.jpg",
    require:true
  },

   rating:{
     type:Number,
     default:0.0,
     require:true
   },

   featured:{
     type:Boolean,
     default:false,
     required:true
   },

   promoted:{
    type:Boolean,
    default:false,
    required:true
   },
   type:{
     type:String,
     required:true
   },
   genre:[{
    id:Number,
    name:String,
     
   }],

   description:{
    type:String,
    require:true
  },
   trailer:{
     type:String,
   },
   
   price:{
    type:Number,
    default:0.00,
    require:true
   },
   rent:{
    type:Number,
    default:0.00,
    require:true
   },
   release_date:{
    type:Date,

   },
   dateCreated:
   {
       type:Date,
       default:Date.now()
   }
  });


//   movieSchema.methods.initializeS3Bucket = function(){
//     const s3 = new AWS.S3({
//       accessKeyId: process.env.ID,
//       secretAccessKey: process.env.SECRET
//     })
//     return s3
//   }

//   movieSchema.pre('save',function(next){
    
//     if(!this.files)
//     {
//       this.img
//       next()
//     }
//     if(!this.files.img)
//     {
//       this.img
//       next()
//     }

//     else if(this.files.img.mimetype.includes("image"))
//     {

//         const s3 = this.initializeS3Bucket()
//         const params = {
//             Bucket: process.env.BUCKET_NAME,
//             Key: `${uuidv4()}_${this.files.img.name}`,
//             Body:this.files.img.data
//         };
//         console.log("Blah")
        
//         s3.upload(params, function(err, data) {
//             if (err) {
//                 throw err;
//             }

            

//             this.img = data.Location
//             console.log('img:'+this.img)
//             next()
//   })
// }else{
//     this.img
//     next()
//   }
//   })


//   movieSchema.pre('save',function(next){
    
//     if(!this.files.poster)
//     {
//       this.poster
//       next()
//     }

//     else if(this.files.poster.mimetype.includes("image"))
//     {

//         const s3 = this.initializeS3Bucket()
//         const params = {
//             Bucket: process.env.BUCKET_NAME,
//             Key: `${uuidv4()}_${this.files.poster.name}`,
//             Body:this.files.poster.data
//         };
//         console.log("Blah")
        
//         s3.upload(params, function(err, data) {
//             if (err) {
//                 throw err;
//             }

            

//             this.poster = data.Location
//             console.log('poster:'+this.poster)
//             next()


//   })
// }else{
//     this.poster
//     next()
//   }
//   })
const movieModel = mongoose.model('movie',movieSchema)
module.exports = movieModel;