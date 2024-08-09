// import helmet from "helmet";
// import cors from "cors";
// import rootRoutes from "./routes/index.js";
// import logRequest from "./middleware/logging.js";
// import logger from "./utils/logger.js";

// const app = express();

// // Use logging middleware for all requests
// app.use(logRequest);

// app.use(json());
// app.use(cors());
// app.use(helmet());

// // Use the routes
// app.use("/api", rootRoutes);


// // Error handling middleware
// app.use((err, req, res, next) => {
//   logger.error(err.message);
//   res.status(500).send("Something broke!");
// });

// export default app;