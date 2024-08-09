

const { createLogger,transports,format } = require("winston");
require('winston-mongodb');
const { combine, timestamp, json, printf } = format;

const logFormat = printf(({ level, message, timestamp, meta }) => {
    return `${timestamp} ${level}: ${message} ${meta ? JSON.stringify(meta) : ''}`;
});

const logger = createLogger({
    format: combine(
        timestamp(),
        logFormat
    ),
 
  transports: [
    new transports.File({
     filename:'info.log',
     level:'info',
     format:format.combine(format.timestamp(), format.json())
   
    }),
    new transports.MongoDB({
        level:'error',
        db: 'mongodb+srv://test:test@cluster0.tkb1eon.mongodb.net/edupathfinder',
        options: { 
            useUnifiedTopology: true 
        } ,
        collection:'logs',
        format:format.combine(format.timestamp(), format.json())
        
    })
  ],
});
// logger.info('Logger setup complete.');

module.exports=logger;