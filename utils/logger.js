// import mongoose from "mongoose";
// import { createLogger, format, transports } from "winston";
// const { combine, timestamp, printf } = format;
// import "winston-mongodb";

// const logFormat = printf(({ level, message, timestamp }) => {
//   return `${timestamp} ${level}: ${message}`;
// });

// const logger = createLogger({
//   level: "info",
//   format: combine(timestamp(), logFormat),
//   transports: [
//     new transports.MongoDB({
//       db: mongoose.connection.useDb("edupathfinder"),
//       options: { useUnifiedTopology: true },
//       collection: "auditlogs",
//       format: format.combine(format.timestamp(), format.json()),
//     }),
//   ],
// });

// export default logger;