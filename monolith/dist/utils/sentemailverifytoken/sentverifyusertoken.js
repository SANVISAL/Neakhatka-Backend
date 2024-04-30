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
exports.sendVerificationEmail = void 0;
// utils/sendEmail.ts
const nodemailer_1 = __importDefault(require("nodemailer"));
function sendVerificationEmail(email, token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create a transporter with your SMTP settings
            const transporter = nodemailer_1.default.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: "sanvisal2302@gmail.com",
                    pass: "qjsljziuvucrjbij ",
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });
            // Send mail with defined transport object
            // const formattedExpiresAt = expiresAt.toLocaleString();
            yield transporter.sendMail({
                from: "sanvisal2302@gmail.com",
                to: email,
                subject: "Email Verification",
                text: `Hello,\n\nPlease verify your email by clicking the following link: \n\nhttp://localhost:5000/auth/verify/${token}\n\n`,
            });
            console.log("Email sent: Check your inbox!");
        }
        catch (error) {
            console.error("Error sending email:", error);
            throw new Error("Error sending email");
        }
    });
}
exports.sendVerificationEmail = sendVerificationEmail;
