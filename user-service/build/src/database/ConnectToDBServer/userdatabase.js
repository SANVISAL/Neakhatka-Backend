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
exports.ConnectToMongoDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const logger_1 = require("../../utils/logger");
class ConnectToMongoDB {
    constructor() {
        this.monogourl = "";
    }
    // private db= mongoose.connection;
    static getInstance() {
        if (!ConnectToMongoDB.instance) {
            ConnectToMongoDB.instance = new ConnectToMongoDB();
        }
        return ConnectToMongoDB.instance;
    }
    connectMongoDB(_a) {
        return __awaiter(this, arguments, void 0, function* ({ url }) {
            this.monogourl = url;
            try {
                yield mongoose_1.default.connect(this.monogourl);
                logger_1.logger.info("Successfully connected to MongoDB");
            }
            catch (err) {
                logger_1.logger.error("Initial MongoDB connection error", { err });
            }
        });
    }
}
exports.ConnectToMongoDB = ConnectToMongoDB;
//# sourceMappingURL=userdatabase.js.map