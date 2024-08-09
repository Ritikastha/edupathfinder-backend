const { json } = require("express");
const Users= require("../model/userModel")
const bcrypt= require("bcrypt")
const crypto = require('crypto');
const moment = require('moment');
const jwt=require("jsonwebtoken")
const saltRounds = 10;

const hashPassword = async (password) => {
    return bcrypt.hash(password, saltRounds);
};

const hashEmail = (email) => {
    return crypto.createHash('sha256').update(email).digest('hex');
};
const isPasswordReused = async (password, previousPasswords) => {
    for (const entry of previousPasswords) {
        const match = await bcrypt.compare(password, entry.hash);
        if (match) {
            return true;
        }
    }
    return false;
};

const createUser =async (req,res)=>{
    console.log(req.body)

    const {fullName,email,password,confirmpassword} = req.body

    if(!fullName  || !email || !password ||!confirmpassword){
        return res.json({
            success:false,
            message:"Please enter all fields."
        })
    }
    try {
        // step 5:Check existing user
        const hashedEmail = hashEmail(email);
        const existingUser=await Users.findOne({email:hashedEmail})
        if(existingUser){
           return res.json({
               success:false,
               message:"User already exists"
           })
        }
        // const checkpassword=await Users.findOne({password:confirmpassword})
        // if(!checkpassword){
        //    return res.json({
        //        success:false,
        //        message:"Password doesnot match"
        //    })
        // }
        // const generateSalt =await bcrypt.genSalt(10)
        // const encryptedPassword=await bcrypt.hash(password,generateSalt)
        const hashedPassword = await hashPassword(password);

        const newUser=new Users({
            fullName:fullName,
            // lastName:lastName,
            email:hashedPassword,
            password:hashedPassword,
            confirmpassword:hashedPassword,
            previousPasswords: [{
                hash: hashedPassword,
                passwordCreated: moment().format('YYYY-MM-DD HH:mm:ss')
            }]
        })
        await newUser.save()
        // step 8:send the response
        res.status(200).json({
            success:true,
            message:"User created sucessfully !"
        }
            )

    } catch (error) {
        console.log(error)
        res.status(500).json("Server Error")
    }
}
        
// login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email "     
            });
        }

        // Perform password validation (e.g., using bcrypt)

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        // Generate JWT token
        const tokenPayload= {
            id: user._id,
            fullName: user.fullName,
            isAdmin: user.isAdmin // Assuming your User schema has an isAdmin field
        };
        const token = jwt.sign(tokenPayload, process.env.JWT_TOKEN_SECRET, { expiresIn: '1h' });
        if(user.isAdmin){
            res.status(200).json({
                success:true,
                // taking the above token to send
                token:token,
                // sending user data to "userData"
                userData:user,
                message:"Admin logged in successfully."
            })   
        }else{
            res.status(200).json({
                success:true,
                // taking the above token to send
                token:token,
                // sending user data to "userData"
                userData:user,
                message:"User logged in successfully."
            }) 
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}

const getUser =async (req,res)=>{
    try{
         const listOfUser =await Users.find();
         res.json({
              success:false,
              message:"User fetched successfully",
              Users:listOfUser
         })

    }catch(error){
         console.log(error);
         res.status(500).json("Server Error")
    }

}



module.exports = {
    createUser,loginUser,getUser
}
