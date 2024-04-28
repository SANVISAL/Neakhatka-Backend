"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../public/UserSign/swagger.json"));
const CardRouter_1 = require("./routes/CardRoutes/CardRouter");
// import { Userrouter } from "./routes/SignUpRoute/User-Sign-Up-Routes";
const AuthRoutes_1 = require("./routes/AuthRoutes/AuthRoutes");
const Userapp = (0, express_1.default)();
// Serve static files from the public directory
Userapp.use(express_1.default.static("public"));
// Middleware to parse JSON and URL-encoded request bodies
Userapp.use(express_1.default.json());
Userapp.use(express_1.default.urlencoded({ extended: true }));
// Routes
// Userapp.use("/tests", router);
Userapp.use("/cards", CardRouter_1.Cardrouter);
// Userapp.use("/users", Userrouter);
Userapp.use("/sign-up", AuthRoutes_1.SignUprouter);
Userapp.use('/verify', AuthRoutes_1.VerifyRoute);
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
Userapp.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
exports.default = Userapp;
