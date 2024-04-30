"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.AuthController = void 0;
const user_service_1 = __importDefault(require("../services/user.service"));
const tsoa_1 = require("tsoa");
const tsoa_2 = require("tsoa");
const validate_input_1 = __importDefault(require("../middlewares/validate-input"));
const schema_1 = require("../schema");
const consts_1 = require("../utils/consts");
const route_defs_1 = require("../routes/v1/route-defs");
const jwt_1 = require("../utils/jwt");
const axios_1 = __importDefault(require("axios"));
const auth_producer_1 = require("../queues/auth.producer");
const server_1 = require("../server");
const logger_1 = require("../utils/logger");
const api_error_1 = __importDefault(require("../errors/api-error"));
let AuthController = class AuthController {
    // TODO:
    // 1. Save User
    // 2. Generate Verification Token & Save to its DB
    // 2. Publish User Detail to Notification Service
    SignUpWithEmail(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = requestBody;
                // Step 1.
                const userService = new user_service_1.default();
                const newUser = yield userService.Create({ username, email, password });
                // Step 2.
                const verificationToken = yield userService.SaveVerificationToken({
                    userId: newUser._id,
                });
                const messageDetails = {
                    receiverEmail: newUser.email,
                    verifyLink: `${verificationToken.emailVerificationToken}`,
                    template: "verifyEmail",
                };
                // Publish To Notification Service
                yield (0, auth_producer_1.publishDirectMessage)(server_1.authChannel, "microsample-email-notification", "auth-email", JSON.stringify(messageDetails), "Verify email message has been sent to notification service");
                return {
                    message: "Sign up successfully. Please verify your email.",
                    data: newUser,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    // TODO:
    // 1. Verify Token
    // 2. Generate JWT
    // 3. Publish User Detail to User Service
    VerifyEmail(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userService = new user_service_1.default();
                // Step 1.
                const user = yield userService.VerifyEmailToken({ token });
                // Step 2.
                const jwtToken = yield (0, jwt_1.generateSignature)({
                    userId: user._id,
                });
                // Step 3.
                const userDetail = yield userService.FindUserByEmail({
                    email: user.email,
                });
                if (!userDetail) {
                    logger_1.logger.error(`AuthController VerifyEmail() method error: user not found`);
                    throw new api_error_1.default(`Something went wrong`, consts_1.StatusCode.InternalServerError);
                }
                const messageDetails = {
                    username: userDetail.username,
                    email: userDetail.email,
                    type: "auth",
                };
                yield (0, auth_producer_1.publishDirectMessage)(server_1.authChannel, "microsample-user-update", "user-applier", JSON.stringify(messageDetails), "User details sent to user service");
                return { message: "User verify email successfully", token: jwtToken };
            }
            catch (error) {
                throw error;
            }
        });
    }
    LoginWithEmail(requestBody) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = requestBody;
                const userService = new user_service_1.default();
                const jwtToken = yield userService.Login({ email, password });
                return {
                    token: jwtToken,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    GoogleAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=profile email`;
            return { url };
        });
    }
    GoogleAuthCallback(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Exchange the code for tokens
                const { data } = yield axios_1.default.post("https://oauth2.googleapis.com/token", {
                    clientId: process.env.CLIENT_ID,
                    client_secret: process.env.CLIENT_SECRET,
                    code,
                    redirect_uri: process.env.REDIRECT_URI,
                    grant_type: "authorization_code",
                });
                // Fetch user profile
                const profile = yield axios_1.default.get("https://www.googleapis.com/oauth2/v1/userinfo", {
                    headers: { Authorization: `Bearer ${data.access_token}` },
                });
                const userService = new user_service_1.default();
                const existingUser = yield userService.FindUserByEmail({
                    email: profile.data.email,
                });
                if (existingUser) {
                    // User Exists, link the Google account if it's not already linked
                    if (!existingUser.googleId) {
                        yield userService.UpdateUser({
                            id: existingUser._id,
                            updates: { googleId: profile.data.id, isVerified: true },
                        });
                    }
                    // Now, proceed to log the user in
                    const jwtToken = yield (0, jwt_1.generateSignature)({
                        userId: existingUser._id,
                    });
                    return {
                        token: jwtToken,
                    };
                }
                // No user exists with this email, create a new user
                const newUser = yield userService.Create({
                    username: profile.data.name,
                    email: profile.data.email,
                    isVerified: true,
                    googleId: profile.data.id,
                });
                const jwtToken = yield (0, jwt_1.generateSignature)({
                    userId: newUser._id,
                });
                return {
                    token: jwtToken,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.Created, "Created"),
    (0, tsoa_1.Post)(route_defs_1.ROUTE_PATHS.AUTH.SIGN_UP),
    (0, tsoa_1.Middlewares)((0, validate_input_1.default)(schema_1.UserSignUpSchema)),
    __param(0, (0, tsoa_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "SignUpWithEmail", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.OK, "OK"),
    (0, tsoa_1.Get)(route_defs_1.ROUTE_PATHS.AUTH.VERIFY),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "VerifyEmail", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.OK, "OK"),
    (0, tsoa_1.Post)(route_defs_1.ROUTE_PATHS.AUTH.LOGIN),
    (0, tsoa_1.Middlewares)((0, validate_input_1.default)(schema_1.UserSignInSchema)),
    __param(0, (0, tsoa_2.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "LoginWithEmail", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.OK, "OK"),
    (0, tsoa_1.Get)(route_defs_1.ROUTE_PATHS.AUTH.GOOGLE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "GoogleAuth", null);
__decorate([
    (0, tsoa_1.SuccessResponse)(consts_1.StatusCode.OK, "OK"),
    (0, tsoa_1.Get)(route_defs_1.ROUTE_PATHS.AUTH.GOOGLE_CALLBACK),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "GoogleAuthCallback", null);
exports.AuthController = AuthController = __decorate([
    (0, tsoa_1.Route)("v1/auth")
], AuthController);
//# sourceMappingURL=auth.controller.js.map