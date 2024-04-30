"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const api_error_1 = __importDefault(require("../error/api-error"));
const consts_1 = require("../utils/consts");
const logger_1 = require("../utils/logger");
const jsonwebtoken_1 = require("jsonwebtoken");
const server_1 = require("../server");
function verifyUser(req, _res, _next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt)) {
                logger_1.logger.error("Token is not available. Gateway Service verifyUser() method error");
                throw new api_error_1.default("Please login to access this resource.", consts_1.StatusCode.Unauthorized);
            }
            yield (0, jsonwebtoken_1.verify)(req.session.jwt, server_1.publicKey, { algorithms: ["RS256"] });
            _next();
        }
        catch (error) {
            _next(error);
        }
    });
}
exports.verifyUser = verifyUser;
//# sourceMappingURL=auth-middleware.js.map