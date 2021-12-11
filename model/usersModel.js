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
   cart:[
     {
        id:Number,
        name:String,
        price:Number,
        img:String,
        cost:Number,
        quantity:Number,
        order:String
        
        
     }
   ],
   purchased:[
     {
      id:Number,
        name:String,
        price:Number,
        img:String,
        quantity:Number,
        cost:Number,
        buy:{
          type:Boolean,
          default:false
        },
        rent:{
          type:Boolean,
          default:false
        }
     }
   ],
   rented:[{
    id:Number,
    name:String,
    price:Number,
    img:String,
    quantity:Number,
    cost:Number,
    buy:{
      type:Boolean,
      default:false
    },
    rent:{
      type:Boolean,
      default:false
    }
   }],
   facebookId:String,
   dateCreated:
   {
       type:Date,
       default:Date.now()
   }
  });

const userModel = mongoose.model('user',userSchema)
module.exports = userModel;