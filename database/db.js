
const mongoose=require('mongoose');


const connectDB=()=>{
    // process.env.DB_URL
    mongoose.connect('mongodb+srv://test:test@cluster0.tkb1eon.mongodb.net/edupathfinder').then(()=>{
        console.log("Connect to Database")
})
}
 // export
 module.exports=connectDB;