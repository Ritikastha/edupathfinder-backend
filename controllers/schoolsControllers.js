const { json, text } = require("express");
const School=require('../model/schoolsModel') ;
const cloudinary =require('cloudinary');
const createSchool=async (req ,res)=>{
    console.log(req.body);
    
    //  // step-2
     const {school,location,level,fee,description,amenties,transportation,cafe,hostel}=req.body;
     const {imageUrl} =req.files;
   
     // Step-3 validate the data
     if(!school||!location|| !level||!fee ||!description||!amenties||!transportation||!cafe||!hostel||!imageUrl ){
          return res,json({
               success:false,
               message:"please fill all the fields"
          });
     }
     // step4
     try{
        // step-5 upload image to cloudinary
        const uploadedImage=await cloudinary.v2.uploader.upload(
            imageUrl.path,
            {
                 folder:'school',
                 // eutai format ma banaune "scale"
                 corp:"scale"
            }
       )
           // save product to database
          //  taking from product model
           const newSchool= new School({
            school:school,
            location:location,
            level:level,
            fee:fee,
            description:description,
            amenties:amenties,
            transportation:transportation,
            cafe:cafe,
            hostel:hostel,
            imageUrl:uploadedImage.secure_url

           })
           await newSchool.save()
           res.status(200).json({
               success:true,
               message:"Schools created successfully",
               data:newSchool
           })

          
     }catch (error){
          console.log(error);
          res.status(500).json("Server Error")
          
     } 
}; 

const getAllSchool =async (req,res)=>{
     try{
          const listOfSchool =await School.find();
          res.json({
               success:false,
               message:"Schools fetched successfully",
               School:listOfSchool
          })

     }catch(error){
          console.log(error);
          res.status(500).json("Server Error")
     }

}
const deletedSchool=async(req,res)=> {
     try{
       const deletedSchool=await School.findByIdAndDelete(req.params.id);
       if(!deletedSchool){
          return res.json({
               success:false,
               message:"School not found"
          })
       }
       res.json({
          success:true,
          message:"School deleted successfully!"
       })
     }catch(error){
          console.log(error);
          res.status(500).json({
               success:false,
               message:"Server Error"
          })
     }
}

module.exports={createSchool,getAllSchool,deletedSchool}
    // getAllPackage}