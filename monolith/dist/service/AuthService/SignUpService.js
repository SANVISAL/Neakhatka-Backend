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
exports.SignUpService = void 0;
const Auth_1 = require("../../model/Auth");
const GenerateToken_1 = require("../../utils/GenerateToken");
const Verifycation_1 = require("../../model/Verifycation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const sentverifytoken_1 = require("../../utils/sentemailverifytoken/sentverifytoken");
class SignUpService {
    constructor(cardRepository) {
        this.signupRepository = cardRepository;
    }
    // service create sign up
    CreateSignupService(SignUpData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // hash password
                if (SignUpData.password) {
                    const hashpassword = yield bcrypt_1.default.hash(SignUpData.password, 10);
                    SignUpData.password = hashpassword;
                }
                const user_signup = new Auth_1.AuthModel(SignUpData);
                const new_Sign_Up = yield user_signup.save();
                // generate token
                const token = (0, GenerateToken_1.generateToken)();
                // save it to verify collection
                const newVerification = new Verifycation_1.VerificationModel({
                    userId: new_Sign_Up._id,
                    token,
                    createdAt: new Date(),
                    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
                });
                yield newVerification.save();
                yield (0, sentverifytoken_1.sendVerificationEmail)(SignUpData.email, newVerification.token);
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
                return yield this.signupRepository.GetAllSignUp();
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
                return yield this.signupRepository.findById(id);
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
                return yield this.signupRepository.updateSignUp(id, UpdateData);
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
                return yield this.signupRepository.delete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.SignUpService = SignUpService;
