
const mongoose = require('mongoose');
const schoolScheme =new mongoose.Schema({
   
    school:{
        type:String,
        required:true,
        trim:true,
    },
    location:{
        type:String,
        required:true,
        trim:true,
    },
    level:{
        type:Number,
        required:true,
        trim:true,
    },
    fee:{
        type:Number,
        required:true,
        trim:true,
    },
    
    
    description:{
        type:String,
        required:true,
        trim:true,
    },
   amenties:{
    type:String,
    required:true,
    trim:true,
   },
   transportation:{
    type:String,
    required:true,
    trim:true,
   },cafe:{
    type:String,
    required:true,
    trim:true,
   },hostel:{
    type:String,
    required:true,
    trim:true,
   },
   imageUrl:{
    type:String,
    require:true,
    trim:true,
}
})

const School =mongoose.model('School',schoolScheme);
module.exports=School;