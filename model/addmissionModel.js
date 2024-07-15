
const mongoose = require('mongoose');
const AddmissionScheme =new mongoose.Schema({
    fatherName:{
        type:String,
        required:true,
        trim:true,
    },
    motherName:{
        type:String,
        required:true,
        trim:true,
    },
    fatherOccupation:{
        type:String,
        required:true,
        trim:true,
    },
    motherOccupation:{
        type:String,
        required:true,
        trim:true,
    },
    
    guardianPhone:{
        type:Number,
        required:true,
        trim:true,
    },
    nationality:{
        type:String,
        required:true,
        trim:true,
    },
    previousSchool:{
        type:String,
        required:true,
        trim:true,
    },
    grade:{
        type:Number,
        required:true,
        trim:true,
    },
    imageUrl:{
        type:String,
        require:true,
        trim:true,
    }

})

const Addmission =mongoose.model('Addmission',AddmissionScheme);
module.exports=Addmission;