const { json, text } = require("express");
const Scholar=require('../model/scholarModel') ;
const cloudinary =require('cloudinary');

const createScholar=async (req ,res)=>{
    console.log(req.body);
    
    //  // step-2
     const {scholar,school,level,duedate,examdate,examtime}=req.body;
     const {imageUrl} =req.files;
   
     // Step-3 validate the data
     if(!scholar||!school|| !level||!duedate||!examdate||!examtime||!imageUrl ){
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
                 folder:'scholar',
                 // eutai format ma banaune "scale"
                 corp:"scale"
            }
       )
           // save product to database
          //  taking from scholar model
           const newScholar= new Scholar({
            scholar:scholar,
            school:school,
            level:level,
            duedate:duedate,
            examtime:examtime,
            examdate:examdate,
            imageUrl:uploadedImage.secure_url

           })
           await newScholar.save()
           res.status(200).json({
               success:true,
               message:"Scholarship created successfully",
               data:newScholar
           })

          
     }catch (error){
          console.log(error);
          res.status(500).json("Server Error")
          
     } 
}; 

const getAllScholar = async (req, res) => {
    try {
        console.log("Fetching all Scholarships");
        const listOfScholar = await Scholar.find();
        res.json({
            success: true,
            message: "Scholarships fetched successfully",
            Scholar: listOfScholar
        });
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
    }
}

const deletedScholar=async(req,res)=> {
     try{
       const deletedScholar=await Scholar.findByIdAndDelete(req.params.id);
       if(!deletedScholar){
          return res.json({
               success:false,
               message:"Scholarship not found"
          })
       }
       res.json({
          success:true,
          message:"Scholarship deleted successfully!"
       })
     }catch(error){
          console.log(error);
          res.status(500).json({
               success:false,
               message:"Server Error"
          })
     }
}

module.exports={createScholar,getAllScholar,deletedScholar}
