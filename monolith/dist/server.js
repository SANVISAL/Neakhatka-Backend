"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const app_1 = __importDefault(require("../src/app"));
exports.app = app_1.default;
const ConnectToMongoDBServer_1 = require("./database/ConnectToMongoDBServer");
// import { connectToDatabasesignup } from "./utils/connectToDB";
const port = 5000;
(0, ConnectToMongoDBServer_1.connectMongoDB)();
app_1.default.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
