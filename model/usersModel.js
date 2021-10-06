const mongoose = require('mongoose');
const { Schema } = mongoose;

  const userSchema = new Schema({
   name:{
       type:String,
       require:true,
   },

   address:{
     type:String,
     require:true
   },

   age:{
     type:Number,
     require:true
   },

   sex:{
     type:String,
     default:false,
     required:true
   },


   dateCreated:
   {
       type:Date,
       default:Date.now()
   }
  });

const movieModel = mongoose.model('user',userSchema)
module.exports = userModel;