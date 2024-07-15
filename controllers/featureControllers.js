const { json, text } = require("express");
const Feature=require('../model/featureModel') ;
const cloudinary =require('cloudinary');

const createFeature=async (req ,res)=>{
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
                 folder:'feature',
                 // eutai format ma banaune "scale"
                 corp:"scale"
            }
       )
           // save product to database
          //  taking from product model
           const newFeature= new Feature({
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
           await newFeature.save()
           res.status(200).json({
               success:true,
               message:"Feature School created successfully",
               data:newFeature
           })

          
     }catch (error){
          console.log(error);
          res.status(500).json("Server Error")
          
     } 
}; 

// const getAllFeature=async (req,res)=>{
//      try{
//           const listOfFeature =await Feature.find();
//           res.json({
//                success:false,
//                message:"Feature School fetched successfully",
//                School:listOfFeature
//           })

//      }catch(error){
//           console.log(error);
//           res.status(500).json("Server Error")
//      }

// }
const getAllFeature = async (req, res) => {
    try {
        console.log("Fetching all features");
        const listOfFeature = await Feature.find();
        res.json({
            success: true,
            message: "Feature schools fetched successfully",
            Feature: listOfFeature
        });
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
    }
}

const deletedFeature=async(req,res)=> {
     try{
       const deletedFeature=await Feature.findByIdAndDelete(req.params.id);
       if(!deletedFeature){
          return res.json({
               success:false,
               message:"Feature School not found"
          })
       }
       res.json({
          success:true,
          message:"Feature School deleted successfully!"
       })
     }catch(error){
          console.log(error);
          res.status(500).json({
               success:false,
               message:"Server Error"
          })
     }
}

module.exports={createFeature,getAllFeature,deletedFeature}
    // getAllPackage}