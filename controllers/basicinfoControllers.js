const { json, text } = require("express");
const mongoose = require('mongoose');
const Basicinfo = require('../model/basicModel');

const createBasicinfo = async (req, res) => {
    console.log(req.body);
    console.log('User ID:', req.userId);  // Ensure this is correct
    console.log('User Full Name:', req.userFullName);

    const { phone, age, level, gender, address, currentschool } = req.body;
    const userId = req.userId;

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
        const existingBasicinfo = await Basicinfo.findOne({ user: userId }); //here
        if (existingBasicinfo) {
            return res.status(400).json({
                success: false,
                message: "Basicinfo already exists for this user"
            });
        }

        // Save basic info to database
        const newBasicinfo = new Basicinfo({
            phone,
            age,
            level,
            gender,
            address,
            currentschool,
            // here
            userId: userId,
            fullName: req.userFullName
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
const updateBasicinfo = async (req, res) => {
    console.log('User ID:', req.userId);
    const userId = req.userId; // Correctly access userId

    const { fullName, phone, age, level, gender, address, currentschool } = req.body;

    if (!fullName || !phone || !age || !level || !gender || !address || !currentschool) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required!'
        });
    }

    try {
        const updatedBasicinfo = await Basicinfo.findOneAndUpdate(
            { user: userId }, // Correct query to find by userId
            { fullName, phone, age, level, gender, address, currentschool },
            { new: true }
        );

        if (!updatedBasicinfo) {
            return res.status(404).json({
                success: false,
                message: 'Basicinfo not found for this user'
            });
        }

        res.json({
            success: true,
            message: 'Basicinfo updated successfully',
            basicinfo: updatedBasicinfo
        });
    } catch (error) {
        console.error('Error updating Basicinfo:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

module.exports = {
    createBasicinfo,
    getAllBasicinfo,
    getSingleBasicinfo,
    updateBasicinfo
};

