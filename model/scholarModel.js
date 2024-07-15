
const mongoose = require('mongoose');
const ScholarScheme =new mongoose.Schema({
   
    scholar:{
        type:Number,
        required:true,
        trim:true,
    },
    school:{
        type:String,
        required:true,
        trim:true,
    },
    level:{
        type:Number,
        required:true,
        trim:true,
    },
    duedate:{
        type:Date,
        required:true,
        trim:true,
    },
    examdate:{
        type:Date,
        required:true,
        trim:true,
    },
    examtime:{
        type:String,
        required:true,
        trim:true,
        validate: {
            validator: function (v) {
              return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/.test(v);
            },
            message: props => `${props.value} is not a valid time format!`,
          },
    },
    imageUrl:{
        type:String,
        require:true,
        trim:true,
    }

})

const Scholar =mongoose.model('Scholar',ScholarScheme);
module.exports=Scholar;