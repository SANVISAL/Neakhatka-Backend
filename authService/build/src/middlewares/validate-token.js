"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const server_1 = require("../server");
const api_error_1 = __importDefault(require("../errors/api-error"));
const consts_1 = require("../utils/consts");
const validateToken = (req, res, _next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1];
        const payload = (0, jsonwebtoken_1.verify)(token, server_1.config.jwtToken);
        // @ts-ignore
        req.currentUser = payload;
        _next();
    }
    _next(new api_error_1.default("User need to be login", consts_1.StatusCode.Unauthorized));
};
exports.validateToken = validateToken;
//# sourceMappingURL=validate-token.js.map