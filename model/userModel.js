const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName :{
        type: String,
        required: true,
    }, 
    // lastName:{
    //     type: String,
    //     required: true,
    // },
    email:{
        type: String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    confirmpassword:{
        type:String,
        required: true,
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    previousPasswords: [
        {
            hash: { type: String, required: true },
            passwordCreated: { type: String, required: true }
        }
    ],
    loginAttempts: {
        type: Number,
        default: 0
    },
    lockUntil: {
        type: Date
    }
})

const Users = mongoose.model('users', userSchema);
module.exports = Users;
