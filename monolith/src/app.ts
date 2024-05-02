import express, { Application } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../public/UserSign/swagger.json";
import AuthRouter from "./routes/AuthRoutes/UserAuthRoutes";
import companyauthrouter from "./routes/AuthRoutes/CompanyAuthRoutes";
import { Userrouter } from "./routes/ProfileRoute/user_profile_Routes";
import { com_profile_router } from "./routes/ProfileRoute/com_profile_Route";
import favoriterouter from "./routes/FavoriteCard_Route/Favorite.routes";
import { Cardrouter } from "./routes/CardRoutes/CardRouter";
import jobRouter from "./routes/Post/jobRoutes";
const app: Application = express();

// Serve static files from the public directory
app.use(express.static("public"));

// Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Global Routes

// auth routes
app.use("/auth", AuthRouter);
app.use("/company-auth", companyauthrouter);
// routes for responr profile
app.use("/user",Userrouter)
app.use("/company",com_profile_router)
// route adding favorite card 
app.use("/cards",Cardrouter)
app.use("/api/favorite-cards",favoriterouter)

// // 6. route company verify token
// app.use("/companyverify", companyverifyRoute);

app.use("/api", jobRouter);

// . swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
export default app;
