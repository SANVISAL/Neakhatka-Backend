import express from "express";
import { RegisterRoutes } from "./routes/v1/routes";
import { errorHandler } from "./middlewares/error-handler"; // Adjust the path as necessary

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(express.static("public"));

// Register your API routes
RegisterRoutes(app);

// Use the error handling middleware here, after all routes
app.use(errorHandler);

export default app;
