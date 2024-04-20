import express, { Application } from "express";
import { router } from "./routes/monolith-heath";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../public/UserSign/swagger.json"
import redoc from "redoc-express";
import * as path from 'path';
const Userapp: Application = express();

Userapp.use(express.static("public"));
Userapp.use(express.json());
Userapp.use(express.urlencoded({ extended: true }));

Userapp.use("/tests",router);

Userapp.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default Userapp