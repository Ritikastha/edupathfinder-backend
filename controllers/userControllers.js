const { json } = require("express");
const Users= require("../model/userModel")
const bcrypt= require("bcrypt")
const crypto = require('crypto');
const moment = require('moment');
const jwt=require("jsonwebtoken")
const saltRounds = 10;
const passwordExpiryDays = 90;

// const runTests = async () => {
//     const testPassword = 'Sita123@'; // The password you used for the test
//     const storedHash = '$2b$10$1WNQ/wQZxPAfjgwg6p46TO8st4XGcMp7Ret2CAG/VJPYYZFlwfVqi'; // The hash from your MongoDB

//     try {
//         const result = await bcrypt.compare(testPassword, storedHash);
//         console.log('Password match result:', result); // Should be true if the passwords match

//         const newHash = await bcrypt.hash('NewPassword123!', saltRounds);
//         console.log('New hash:', newHash);
//     } catch (err) {
//         console.error('Error:', err);
//     }
// };

// Call the async function



const displayPasswordCreatedDate = (date) => {
    return moment(date).format('YYYY-MM-DD'); // Format as 'Year-Month-Day'
}
 
const hashPassword = async (password) => {
    return bcrypt.hash(password, saltRounds);
};

const hashEmail = (email) => {
    return crypto.createHash('sha256').update(email).digest('hex');
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
        // const formattedDate = displayPasswordCreatedDate(user.previousPasswords[0].passwordCreated);
        // console.log("Formatted Password Created Date:", formattedDate);
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
            email:hashedEmail,
            password:hashedPassword,
            confirmpassword:hashedPassword,
            previousPasswords: [{
                hash: hashedPassword,
                passwordCreated:new Date()
            }],
            loginAttempts: 0,
            lockUntil: null,
            lastPasswordChange: new Date() 
        })
        await newUser.save()
        // step 8:send the response
        res.status(200).json({
            success:true,
            message:"User created sucessfully !"
        }
            );

    } catch (error) {
        console.error("Error creating user:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
}
        
// login
const maxLoginAttempts = 3;
const lockTime =  60* 60 * 1000; // 1 hour lock time
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const hashedEmail = hashEmail(email);
    try {
        const user = await Users.findOne({ email: hashedEmail });
        if (!user) {
            console.log('User not found:', hashedEmail);
            return res.status(400).json({
                success: false,
                message: "Invalid email "     
            });
        }
          // Check if the account is currently locked
        if (user.lockUntil && user.lockUntil > Date.now()) {
            return res.status(403).json({
                success: false,
                message: `Account locked. Try again later.`
            });
        }
        // Reset login attempts if account is unlocked or first attempt
        if (user.lockUntil && user.lockUntil <= Date.now()) {
            user.loginAttempts = 0;
            user.lockUntil = null;
        }

        // Check if password has expired
        const lastPasswordChange = user.previousPasswords[0]?.passwordCreated;
        if (lastPasswordChange && moment().diff(moment(lastPasswordChange), 'days') > passwordExpiryDays) {
            return res.status(403).json({
                success: false,
                message: 'Your password has expired. Please change your password.',
                passwordExpired: true
            });
            
        }
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            user.loginAttempts += 1;

            if (user.loginAttempts >= maxLoginAttempts) {
                user.lockUntil = Date.now() + lockTime; // Set lock time
                user.loginAttempts = 0; // Reset login attempts after locking
            }
            await user.save();

            return res.status(400).json({
                success: false,
                message: "Invalid password"
            });
        }

        // Reset login attempts on successful login
        user.loginAttempts = 0;
        user.lockUntil = null;

        await user.save();

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

// Update Password Function
const updatePassword = async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
        return res.status(400).json({
            success: false,
            message: "Please provide email, old password, and new password."
        });
    }

    try {
        const hashedEmail = hashEmail(email);
        const user = await Users.findOne({ email: hashedEmail });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }
    // Log for debugging
    // console.log('Stored password hash:', user.password);
    // console.log('Old password provided:', oldPassword);

    const isOldPasswordValid = await bcrypt.compare(oldPassword.trim(), user.password);
        if (!isOldPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Old password is incorrect."
            });
        }

        const isNewPasswordSame = await bcrypt.compare(newPassword.trim(), user.password);
        if (isNewPasswordSame) {
            return res.status(400).json({
                success: false,
                message: "New password cannot be the same as the old password."
            });
        }

        const hashedNewPassword = await hashPassword(newPassword);

        // Update user document
        user.password = hashedNewPassword;
        user.confirmpassword = hashedNewPassword; // Ensure this field is also updated
        user.lastPasswordChange = new Date(); // Update lastPasswordChange to current date

        // Add new password to previousPasswords
        user.previousPasswords.push({
            hash: hashedNewPassword,
            passwordCreated: new Date()
        });

        await user.save();

        res.status(200).json({
            success: true,
            message: "Password updated successfully."
        });
    } catch (error) {
        console.error("Error updating password:", error.message);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    createUser,loginUser,getUser,updatePassword
}
