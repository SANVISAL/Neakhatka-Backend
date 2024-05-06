import express from "express";
import { RegisterRoutes } from "./routes/v1/routes";


const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(express.static("public"));

RegisterRoutes(app)

export default app 