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
Object.defineProperty(exports, "__esModule", { value: true });
const UserAuth_1 = require("../../model/AuthModel/UserAuth");
const UserVerifycation_1 = require("../../model/VerifyModel/UserVerifycation");
const GenerateToken_1 = require("../GenerateToken");
const sentverifyusertoken_1 = require("../sentemailverifytoken/sentverifyusertoken");
function resendVerificationToken(email) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Find user by email
            const existingUser = yield UserAuth_1.AuthModel.findOne({ email });
            if (!existingUser) {
                return {
                    status: "Error",
                    message: "User not found",
                };
            }
            // Find existing verification entry
            const existingVerification = yield UserVerifycation_1.VerificationModel.findOne({ userId: existingUser._id });
            if (!existingVerification) {
                return {
                    status: "Error",
                    message: "Verification token not found",
                };
            }
            // Generate a new token
            const newToken = (0, GenerateToken_1.generateToken)();
            // Update existing verification entry with new token and expiration time
            existingVerification.token = newToken;
            existingVerification.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Expires in 24 hours
            yield existingVerification.save();
            // Resend verification email with the new token
            yield (0, sentverifyusertoken_1.sendVerificationEmail)(email, newToken);
            return {
                status: "Success",
                message: "New verification token generated and resent successfully",
            };
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    });
}
exports.default = resendVerificationToken;
