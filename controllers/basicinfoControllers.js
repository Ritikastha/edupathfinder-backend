const { json, text } = require("express");
const mongoose = require('mongoose');
const Basicinfo = require('../model/basicModel');
const Users = require("../model/userModel")
const { ObjectId } = require('mongodb');


const createBasicinfo = async (req, res) => {
    console.log(req.body);
    console.log("oiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    console.log('User ID:', req.body.userId);  // En
    console.log('User Full name:', req.body.fullName);  // Ensure this is correct

    const { phone, age, level, gender, address, currentschool } = req.body;
    const userId = req.body.userId;

    if (!phone || !age || !level || !gender || !address || !currentschool) {
        return res.json({
            success: false,
            message: "Please fill all the fields"
        });
    }

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: "User ID is missing"
        });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid User ID"
        });
    }

    try {
        // Check if Basicinfo already exists for this user
        const existingBasicinfo = await Basicinfo.findOne({ _id: userId }); //here
        if (existingBasicinfo) {
            return res.status(400).json({
                success: false,
                message: "Basicinfo already exists for this user"
            });
        }

        // console.log(typeof userId)


        // const user111 = await Users.findOne({ _id: userId });


        // Save basic info to database
        const newBasicinfo = new Basicinfo({
            phone,
            age,
            level,
            gender,
            address,
            currentschool,
            user: userId,
            fullName: req.body.fullName
        });

        await newBasicinfo.save();
        res.status(200).json({
            success: true,
            message: "Basicinfo created successfully",
            data: newBasicinfo
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};



const getAllBasicinfo = async (req, res) => {
    try {
        const listOfBasicinfo = await Basicinfo.find();
        res.json({
            success: true,
            message: "Basicinfo fetched successfully",
            Basicinfo: listOfBasicinfo
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};


const getSingleBasicinfo = async (req, res) => {
    console.log('User ID:', req.userId);// Ensure that this is the correct property name
    const userId = req.userId;
    try {
        const singleBasicinfo = await Basicinfo.findOne({ user: userId });
        if (!singleBasicinfo) {
            return res.status(404).json({
                success: false,
                message: "Basicinfo not found for this user"
            });
        }

        res.json({
            success: true,
            message: "Basicinfo fetched successfully",
            Basicinfo: singleBasicinfo
        });
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
    }
};

const updateHai = (newObj, userId) => {




}


const updateBasicinfo = async (req, res) => {

    await Basicinfo.findOneAndUpdate(
        { user: req.body.user },
        { $set: req.body },
        { new: true }
    )

    // if (!updatedBasicinfo) {
    //     return res.status(401).json({
    //         success: false,
    //         message: 'Basicinfo not found for this user'
    //     });
    // }

    //    updateHai(newObj, userId);

    res.json({
        success: true,
        message: 'Basicinfo updated successfully',
        //basicinfo: updatedBasicinfo
    });





};




module.exports = {
    createBasicinfo,
    getAllBasicinfo,
    getSingleBasicinfo,
    updateBasicinfo
};

