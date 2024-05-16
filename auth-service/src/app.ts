import express from "express";
import { RegisterRoutes } from "./routes/v1/routes";
import { errorHandler } from "./middlewares/error-handler";
// import cors from "cors";
// import getConfig from "./utils/config";

const app = express();

// Configure CORS
// app.use(
//   cors({
//     origin: getConfig().apiGateway,
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   })
// );

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));

// Serve static files
app.use(express.static("public"));

// Register API routes
RegisterRoutes(app);

// Error handling middleware
app.use(errorHandler);

export default app;
