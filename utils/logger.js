

// const { createLogger,transports,format } = require("winston");
// require('winston-mongodb');
// const { combine, timestamp, json, printf } = format;
// const logFormat = printf(({ level, message, timestamp, meta }) => {
//     return `${timestamp} ${level}: ${message} ${meta ? JSON.stringify(meta) : ''}`;
// });
// const logger = createLogger({
//     format: combine(
//         timestamp(),
//         logFormat
//     ),
//   transports: [
//     new transports.File({
//      filename:'info.log',
//      level:'info',
//      format:format.combine(format.timestamp(), format.json())
   
//     }),
//     new transports.MongoDB({
//         level:'info',
//         db: 'mongodb+srv://test:test@cluster0.tkb1eon.mongodb.net/edupathfinder',
//         options: { 
//             useUnifiedTopology: true 
//         } ,
//         collection:'logs',
//         format:format.combine(format.timestamp(), format.json())
//     })
//   ],
// });
// module.exports=logger;
const winston = require('winston');
require('winston-mongodb');

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.MongoDB({
            db: 'mongodb+srv://test:test@cluster0.tkb1eon.mongodb.net/edupathfinder',
            collection: 'logs',
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
            options: {
                useUnifiedTopology: true
            }
        })
    ]
});

module.exports=logger;