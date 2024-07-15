const { json, text } = require("express");
const Review=require('../model/rateandreviewModel.js') ;
 

const createReview=async (req ,res)=>{
    console.log(req.body);
     const {schoolId,rating,review}=req.body;
     if (!schoolId || !rating || !review) {
        return res.status(400).json({
          success: false,
          message: "All fields are required"
        });
      }
  
   try{
     const newReview= new Review({
        schoolId:schoolId,
        rating:rating,
        review:review,
       })
       await newReview.save()
       res.status(200).json({
           success:true,
           message:"Reviews created successfully",
           data:newReview
       })
          
     }catch (error){
          console.log(error);
          res.status(500).json("Server Error")
          
     } 
    };
const getAllReview =async (req,res)=>{
     try{
          const listOfReview =await Review.find({ schoolId: req.params.schoolId });
          res.json({
               success:false,
               message:"Reviews fetched successfully",
               Review:listOfReview
          });

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

module.exports={createReview,getAllReview}
    // getAllPackage}