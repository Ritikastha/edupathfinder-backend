const mongoose = require('mongoose');

const basicinfoScheme = new mongoose.Schema({
    phone: {
        type: Number,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
        trim: true,
    },
    level: {
        type: Number,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    currentschool: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: String,
        trim: true,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    }
});

const Basicinfo = mongoose.model('Basicinfo', basicinfoScheme);
module.exports = Basicinfo;
