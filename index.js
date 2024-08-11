const express =require('express');
const dotenv=require('dotenv');
// const mongoose=require('mongoose');
const connectDB = require('./database/db');
const cors=require('cors');
const multiparty=require('connect-multiparty')
const cloudinary=require('cloudinary').v2;
const { authGuard} = require('./middleware/authGuard');
const session = require('express-session');
const logger =require("./utils/logger")
const {auditLogger} = require('./middleware/authGuard')
const cookieParser = require('cookie-parser');
dotenv.config();

// cloudinary config
cloudinary.config({
cloud_name: process.env.CLOUD_NAME, 
api_key: process.env.API_KEY, 
api_secret:process.env.API_SECRET 

});

const app=express();
connectDB();

// const corsPolicy={
//   origin:true,
//   credential:true,
//   optionSuccessStatus:200
// }

app.use(
  cors({
    origin:["https://localhost:3000"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
  })
)

// app.use(cors(corsPolicy));

app.use(multiparty());

app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret:process.env.SECRET_KEY, // Change this to a strong secret key
  resave: false,
  saveUninitialized: true,
  cookie: {
     secure: false,
     maxAge:30000* 60 *60 *24,
     httpOnly:false,
 } 
}));
app.use(helmet());

app.use(mongoSanitize());
app.use(xss());

const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);


app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use(auditLogger);
app.use('/api/audit', require('./routes/auditRoutes'));
// router.get('/logs', getLogs);
app.use('/api/user',require('./routes/usersRoutes'))
app.use('/api/school',require('./routes/schoolsRoutes'))
app.use('/api/feature',require('./routes/featureRoutes'))
app.use('/api/event',require('./routes/eventRoutes'))
app.use('/api/scholar',require('./routes/scholarRoutes'))
app.use('/api/review',require('./routes/reviewRoutes'))
app.use('/api/basicinfo',require('./routes/basicinfoRoutes'))
app.use('/api/addmission',require('./routes/addmissionRoutes'))

app.use((err, req, res, next) => {
  logger.error('Server error', { meta: { error: err.message, stack: err.stack } });
  res.status(500).json({
      success: false,
      message: 'Internal server error'
  });
});

const PORT=5000;

app.listen(PORT, ()=>{
  logger.info(`Server is running on port ${PORT} `)
})

module.exports= app;

