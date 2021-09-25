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

   rating:{
     type:Number,
     require:true
   },
   
   price:{
    type:Number,
    require:true
   },

   dateCreated:
   {
       type:Date,
       default:Date.now()
   }
  });

const movieModel = mongoose.model('movie',movieSchema)
module.exports = movieModel;