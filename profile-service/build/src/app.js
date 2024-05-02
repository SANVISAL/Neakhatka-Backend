"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./utils/config"));
const app = (0, express_1.default)();
app.set("trust proxy", 1);
app.use((0, hpp_1.default)());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: (0, config_1.default)().apiGateway,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.use(express_1.default.static("public"));
exports.default = app;
//# sourceMappingURL=app.js.map