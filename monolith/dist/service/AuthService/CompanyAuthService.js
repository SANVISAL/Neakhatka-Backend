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
const CompanyAuth_1 = require("../../model/AuthModel/CompanyAuth");
const GenerateToken_1 = require("../../utils/GenerateToken");
const CompanyVerifyEmail_1 = require("../../model/VerifyModel/CompanyVerifyEmail");
const bcrypt_1 = __importDefault(require("bcrypt"));
const sentverifycompanytoken_1 = require("../../utils/sentemailverifytoken/sentverifycompanytoken");
class CompanyAuthService {
    constructor(authRepository) {
        this.authRepository = authRepository;
    }
    // service create sign up
    SignupService(SignUpData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // hash password
                if (SignUpData.password) {
                    const hashpassword = yield bcrypt_1.default.hash(SignUpData.password, 10);
                    SignUpData.password = hashpassword;
                }
                const company_signup = new CompanyAuth_1.CompanyAuthModel(SignUpData);
                const new_Sign_Up = yield company_signup.save();
                // generate token
                const token = (0, GenerateToken_1.generateToken)();
                // save it to verify collection
                const newVerification = new CompanyVerifyEmail_1.CompanyVerificationModel({
                    CompanyId: new_Sign_Up._id,
                    token,
                    createdAt: new Date(),
                    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
                });
                yield newVerification.save();
                yield (0, sentverifycompanytoken_1.sendVerificationcomapnyEmail)(SignUpData.email, newVerification.token);
                return {
                    status: "Succecss",
                    message: "Sign Up Successfully",
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // seervice get all sign up
    GetAllSignUpService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.authRepository.GetAllSignUp();
            }
            catch (error) {
                throw error;
            }
        });
    }
    // service get sign up by id
    GetByIdService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.authRepository.FindById(id);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // service update sign up
    UpdateSignUpService(id, UpdateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.authRepository.UpdateSignUp(id, UpdateData);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // delete sign up service
    DeleteSignupService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.authRepository.Delete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = CompanyAuthService;
