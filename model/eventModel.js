
const mongoose = require('mongoose');
const eventScheme =new mongoose.Schema({
    event:{
        type:String,
        required:true,
        trim:true,
    },
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
    
    date:{
        type:Date,
        required:true,
        trim:true,
    },
    imageUrl:{
        type:String,
        require:true,
        trim:true,
    }

})

const Event =mongoose.model('Event',eventScheme);
module.exports=Event;