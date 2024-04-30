"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../public/UserSign/swagger.json"));
const UserAuthRoutes_1 = __importDefault(require("./routes/AuthRoutes/UserAuthRoutes"));
const CompanyAuthRoutes_1 = __importDefault(require("./routes/AuthRoutes/CompanyAuthRoutes"));
const user_profile_Routes_1 = require("./routes/ProfileRoute/user_profile_Routes");
const com_profile_Route_1 = require("./routes/ProfileRoute/com_profile_Route");
const Favorite_routes_1 = __importDefault(require("./routes/FavoriteCard_Route/Favorite.routes"));
const CardRouter_1 = require("./routes/CardRoutes/CardRouter");
const app = (0, express_1.default)();
// Serve static files from the public directory
app.use(express_1.default.static("public"));
// Middleware to parse JSON and URL-encoded request bodies
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Global Routes
// auth routes
app.use("/auth", UserAuthRoutes_1.default);
app.use("/company-auth", CompanyAuthRoutes_1.default);
// routes for responr profile
app.use("/user", user_profile_Routes_1.Userrouter);
app.use("/company", com_profile_Route_1.com_profile_router);
// route adding favorite card 
app.use("/cards", CardRouter_1.Cardrouter);
app.use("/api/favorite-cards", Favorite_routes_1.default);
// // 6. route company verify token
// app.use("/companyverify", companyverifyRoute);
// . swagger
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
exports.default = app;
