import express from "express";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import getConfig from "./util/config";
import { RegisterRoutes } from "./routes/v1/routes";

const app = express();

app.set("trust proxy", 1);

app.use(hpp());
app.use(helmet());
app.use(
  cors({
    origin: getConfig().apiGateway,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);
app.use(express.static("public"));
app.use(express.json());

RegisterRoutes(app);

export default app;
