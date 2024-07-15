const { json, text } = require("express");
const Event=require('../model/eventModel') ;
const cloudinary =require('cloudinary');

const createEvent=async (req ,res)=>{
    console.log(req.body);
    
    //  // step-2
     const {event,school,location,date}=req.body;
     const {imageUrl} =req.files;
   
     // Step-3 validate the data
     if(!event || !school|| !location||!date||!imageUrl ){
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
                 folder:'event',
                 // eutai format ma banaune "scale"
                 corp:"scale"
            }
       )
           // save product to database
          //  taking from product model
           const newEvent= new Event({
            event:event,
            school:school,
            location:location,
            date:date,
            imageUrl:uploadedImage.secure_url
           })
           await newEvent.save()
           res.status(200).json({
               success:true,
               message:"Event created successfully",
               data:newEvent
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
const getAllEvent= async (req, res) => {
    try {
        console.log("Fetching all events");
        const listOfEvent = await Event.find();
        res.json({
            success: true,
            message: "Events fetched successfully",
            Event: listOfEvent //"Event" array name 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
    }
}

const deletedEvent=async(req,res)=> {
     try{
       const deletedEvent=await Event.findByIdAndDelete(req.params.id);
       if(!deletedEvent){
          return res.json({
               success:false,
               message:"Events not found"
          })
       }
       res.json({
          success:true,
          message:"Event deleted successfully!"
       })
     }catch(error){
          console.log(error);
          res.status(500).json({
               success:false,
               message:"Server Error"
          })
     }
}

module.exports={createEvent,getAllEvent,deletedEvent}
    // getAllPackage}