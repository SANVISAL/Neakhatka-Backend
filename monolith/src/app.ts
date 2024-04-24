import express, { Application } from "express";
import { router } from "./routes/monolith-heath";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../public/UserSign/swagger.json";
import redoc from "redoc-express";
import * as path from "path";
import { Cardrouter } from "./routes/CardRoutes/CardRouter";
// import { Userrouter } from "./routes/SignUpRoute/User-Sign-Up-Routes";
import { SignUprouter, VerifyRoute } from "./routes/AuthRoutes/AuthRoutes";
import jobRoutes from "./routes/Post/jobRoutes";
import { errorHandler } from "./middlewares/Post/errorMiddleware";
const app: Application = express();

// Serve static files from the public directory
app.use(express.static("public"));

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Error handling middleware
app.use(errorHandler);

// Routes
app.use("/api/jobs", jobRoutes);
// app.use("/tests", router);
app.use("/cards", Cardrouter);
// app.use("/users", Userrouter);
app.use("/sign-up", SignUprouter);
app.use('/verify',VerifyRoute);
// ReDoc documentation endpoint
// Userapp.get(
//   "/docs",
//   redoc({
//     title: "API Docs",
//     specUrl: "/api-docs/swagger.json", // Corrected specUrl
//     redocOptions: {
//       theme: {
//         colors: {
//           primary: {
//             main: "#6EC5AB",
//           },
//         },
//         typography: {
//           fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
//           fontSize: "15px",
//           lineHeight: "1.5",
//           code: {
//             code: "#87E8C7",
//             backgroundColor: "#4D4D4E",
//           },
//         },
//         menu: {
//           backgroundColor: "#ffffff",
//         },
//       },
//     },
//   })
// );

// Swagger UI endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;
