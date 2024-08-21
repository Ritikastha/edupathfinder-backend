const { json, text } = require("express");
const cloudinary =require('cloudinary');
const Addmission = require("../model/addmissionModel");
const { encrypt, decrypt } = require('../utils/encryption'); 
const createAddmission=async (req ,res)=>{
    console.log(req.body);
    
    //  // step-2
     const {fatherName,motherName,fatherOccupation,motherOccupation,guardianPhone,nationality,previousSchool,grade}=req.body;
     const {imageUrl} =req.files;
   
     // Step-3 validate the data
     if(!fatherName||!motherName|| !fatherOccupation||!motherOccupation ||!guardianPhone||!nationality||!previousSchool||!grade||!imageUrl ){
          return res,json({
               success:false,
               message:"please fill all the fields"
          });
     }
     // step4
     try{
          const encryptedGuardianPhone = encrypt(guardianPhone);
          const encryptedNationality = encrypt(nationality);
          const encryptedPreviousSchool = encrypt(previousSchool);
          const encryptedFatherOccupation = encrypt(fatherOccupation);
          const encryptedMotherOccupation = encrypt(motherOccupation);
          const uploadedImage=await cloudinary.v2.uploader.upload(
            imageUrl.path,
            {
                 folder:'addmission',
                 // eutai format ma banaune "scale"
                 corp:"scale"
            }
       )
           // save product to database
           const newAddmission= new Addmission({
            fatherName:fatherName,
            motherName:motherName,
            fatherOccupation:encryptedFatherOccupation,
            motherOccupation:encryptedMotherOccupation,
            guardianPhone:encryptedGuardianPhone,
            nationality:encryptedNationality,
            previousSchool:encryptedPreviousSchool,
            grade:grade,
            imageUrl:uploadedImage.secure_url

           })
           await newAddmission.save()
           res.status(200).json({
               success:true,
               message:"Addmission Form Sent Successfully",
               data:newAddmission
           })

          
     }catch (error){
          console.log(error);
          res.status(500).json("Server Error")
          
     } 
}; 

const getAllAddmission =async (req,res)=>{
     try{
          const listOfAddmission =await Addmission.find();
          // Decrypt data before sending to the client
        listOfAddmission.forEach((admission) => {
          admission.fatherOccupation = decrypt(admission.fatherOccupation);
          admission.motherOccupation = decrypt(admission.motherOccupation);
          admission.guardianPhone = decrypt(admission.guardianPhone);
          admission.nationality = decrypt(admission.nationality);
          admission.previousSchool = decrypt(admission.previousSchool);
      });

          res.json({
               success:false,
               message:"Addmission fetched successfully",
               Addmission:listOfAddmission
          })

     }catch(error){
          console.log(error);
          res.status(500).json("Server Error")
     }

}
// const deletedSchool=async(req,res)=> {
//      try{
//        const deletedSchool=await School.findByIdAndDelete(req.params.id);
//        if(!deletedSchool){
//           return res.json({
//                success:false,
//                message:"School not found"
//           })
//        }
//        res.json({
//           success:true,
//           message:"School deleted successfully!"
//        })
//      }catch(error){
//           console.log(error);
//           res.status(500).json({
//                success:false,
//                message:"Server Error"
//           })
//      }
// }

module.exports={createAddmission,getAllAddmission}
    // getAllPackage}