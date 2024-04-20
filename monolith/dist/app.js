"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const monolith_heath_1 = require("./routes/monolith-heath");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_json_1 = __importDefault(require("../public/UserSign/swagger.json"));
const Userapp = (0, express_1.default)();
Userapp.use(express_1.default.static("public"));
Userapp.use(express_1.default.json());
Userapp.use(express_1.default.urlencoded({ extended: true }));
Userapp.use("/tests", monolith_heath_1.router);
Userapp.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default));
exports.default = Userapp;
