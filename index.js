const express =require('express');
const dotenv=require('dotenv');
// const mongoose=require('mongoose');
const connectDB = require('./database/db');
const cors=require('cors');
const multiparty=require('connect-multiparty')
const cloudinary=require('cloudinary').v2;
const { authGuard} = require('./middleware/authGuard');
const session = require('express-session');


dotenv.config();

// cloudinary config
cloudinary.config({
cloud_name: process.env.CLOUD_NAME, 
api_key: process.env.API_KEY, 
api_secret:process.env.API_SECRET 

});

const app=express();
connectDB();

const corsPolicy={
  origin:true,
  credential:true,
  optionSuccessStatus:200
}
app.use(cors(corsPolicy));

app.use(multiparty());

app.use(express.json());

app.use(session({
  secret:process.env.SECRET_KEY, // Change this to a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } 
}));

app.use('/api/user',require('./routes/usersRoutes'))
app.use('/api/school',require('./routes/schoolsRoutes'))
app.use('/api/feature',require('./routes/featureRoutes'))
app.use('/api/event',require('./routes/eventRoutes'))
app.use('/api/scholar',require('./routes/scholarRoutes'))
app.use('/api/review',require('./routes/reviewRoutes'))
app.use('/api/basicinfo',require('./routes/basicinfoRoutes'))
app.use('/api/addmission',require('./routes/addmissionRoutes'))
const PORT=5000;

app.listen(PORT, ()=>{
  console.info(`Server is running on port ${PORT} `)
})

module.exports= app;