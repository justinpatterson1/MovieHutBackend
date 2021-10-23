const mongoose = require('mongoose');
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
   genre:{
     type:String,
     
   },

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
   release_date:{
    type:Date,

   },
   dateCreated:
   {
       type:Date,
       default:Date.now()
   }
  });

const movieModel = mongoose.model('movie',movieSchema)
module.exports = movieModel;