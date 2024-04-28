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
exports.VerifyRoute = exports.SignUprouter = void 0;
const express_1 = __importDefault(require("express"));
const SignupController_1 = require("../../controller/AuthController/SignupController");
const SignUpService_1 = require("../../service/AuthService/SignUpService");
const SignUpRepository_1 = require("../../repository/Auth/SignUpRepository");
const Verifycation_1 = require("../../model/Verifycation");
const Auth_1 = require("../../model/Auth");
const UserProfielModel_1 = require("../../model/UserProfielModel");
const console_1 = require("console");
const SignUprouter = express_1.default.Router();
exports.SignUprouter = SignUprouter;
const VerifyRoute = express_1.default.Router();
exports.VerifyRoute = VerifyRoute;
const signupRepository = new SignUpRepository_1.SignUpRepository();
const signupService = new SignUpService_1.SignUpService(signupRepository);
const signupController = new SignupController_1.SignUpController(signupService);
SignUprouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Hello");
    try {
        const requestBody = req.body;
        const User = yield signupController.CreateSignUpController(requestBody);
        res.json(User);
    }
    catch (error) {
        next(error);
    }
}));
// get all card
SignUprouter.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Response = yield signupController.GetAllSignUpController();
        res.send(Response);
    }
    catch (error) {
        console.log(error);
    }
}));
// // get card by id
SignUprouter.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User = yield signupController.GetSignUpById(req.params.id);
        res.send(User);
    }
    catch (error) {
        console.log(error);
    }
}));
// // update card
SignUprouter.put("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const SignUpID = req.params.id;
        const UpdateData = req.body;
        const updated = yield signupController.UpdateSignUpController(SignUpID, UpdateData);
        if (updated) {
            res.status(200).json(updated);
        }
        else {
            res.status(404).json({ message: " Not Found" });
        }
    }
    catch (error) { }
}));
// // delete card
SignUprouter.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const CardID = req.params.id;
    try {
        const cardDelete = yield signupController.DeleteSignUpContrioller(CardID);
        if (!cardDelete) {
            res.status(404).json({ message: " Not Found" });
        }
        else {
            res.status(200).json({ message: "deleted Successfully" });
        }
    }
    catch (error) {
        next(error);
    }
}));
// Verify route
VerifyRoute.get("/:token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        console.log(token);
        // Find the token in the database
        const VerifittEnty = yield Verifycation_1.VerificationModel.findOne({ "token": token });
        console.log(VerifittEnty);
        if (!VerifittEnty) {
            return res.status(404).send("Token not found");
        }
        // Check token expiration
        if (VerifittEnty.expiresAt < new Date()) {
            //    await deleteExpiredUsers()
            return res.status(401).send("Token has expired");
        }
        yield Auth_1.AuthModel.findOneAndUpdate(VerifittEnty.userId, { isVerified: true });
        // Fetc first name and Last name from Auth
        const Authuser = yield Auth_1.AuthModel.findById(VerifittEnty.userId);
        if (!Authuser) {
            return res.status(404).send("User Not Found");
        }
        // Create or Update UserProfile with firstName and lastName
        const userProfile = yield UserProfielModel_1.UserModel.findOne({ email: Authuser.email });
        if (userProfile) {
            // userProfile.firstName = Authuser.firstName;
            // userProfile.lastName = Authuser.lastName;
            // await userProfile.save();
            console.log(console_1.error);
        }
        else {
            yield UserProfielModel_1.UserModel.create({
                firstName: Authuser.firstName,
                lastName: Authuser.lastName,
                email: Authuser.email,
                // other fields can be initialized with default values or left blank
            });
        }
        // Redirect user to a success page or send a response
        res.send("Email verified successfully");
    }
    catch (error) {
        console.error("Error verifying email:", error);
        res.status(500).send("Error verifying email");
    }
}));
