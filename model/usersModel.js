const mongoose = require('mongoose');
const { Schema } = mongoose;

  const userSchema = new Schema({
   firstName:{
       type:String,
       require:true,
   },

   lastName:{
    type:String,
    require:true,
},
   address:{
     type:String,
     require:true
   },

   email:{
    type:String,
    required:true
   },

   password:{
    type:String,
    required:true
   },

   level:{
    type:String,
    default:"User",
    required:true
   },


   dateCreated:
   {
       type:Date,
       default:Date.now()
   }
  });

const userModel = mongoose.model('user',userSchema)
module.exports = userModel;