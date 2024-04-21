import express, { Application } from "express";
import { router } from "./routes/monolith-heath";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../public/UserSign/swagger.json";
import redoc from "redoc-express";
import * as path from "path";
import { Cardrouter } from "./routes/CardRoutes/CardRouter";
import { Userrouter } from "./routes/SignUpRoute/User-Sign-Up-Routes";

const Userapp: Application = express();

// Serve static files from the public directory
Userapp.use(express.static("public"));

// Middleware to parse JSON and URL-encoded request bodies
Userapp.use(express.json());
Userapp.use(express.urlencoded({ extended: true }));

// Routes
Userapp.use("/tests", router);
Userapp.use("/cards", Cardrouter);
Userapp.use("/users", Userrouter);

// ReDoc documentation endpoint
Userapp.get(
  "/docs",
  redoc({
    title: "API Docs",
    specUrl: "/api-docs/swagger.json", // Corrected specUrl
    redocOptions: {
      theme: {
        colors: {
          primary: {
            main: "#6EC5AB",
          },
        },
        typography: {
          fontFamily: `"museo-sans", 'Helvetica Neue', Helvetica, Arial, sans-serif`,
          fontSize: "15px",
          lineHeight: "1.5",
          code: {
            code: "#87E8C7",
            backgroundColor: "#4D4D4E",
          },
        },
        menu: {
          backgroundColor: "#ffffff",
        },
      },
    },
  })
);

// Swagger UI endpoint
Userapp.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default Userapp;
