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
const express_1 = __importDefault(require("express"));
const UserSignupController_1 = __importDefault(require("../../controller/AuthController/UserSignupController"));
const UserSignUpService_1 = __importDefault(require("../../service/AuthService/UserSignUpService"));
const userauthRepository_1 = __importDefault(require("../../repository/Auth/userauthRepository"));
const UserVerifycation_1 = require("../../model/VerifyModel/UserVerifycation");
const UserAuth_1 = require("../../model/AuthModel/UserAuth");
const UserProfielModel_1 = require("../../model/ProfileModel/UserProfielModel");
const resendVerificationToken_1 = __importDefault(require("../../utils/resentverifytoken/resendVerificationToken"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const axios_1 = __importDefault(require("axios"));
const AuthRouter = express_1.default.Router();
///////////////////
const CLIENT_ID = '630367907506-fe23t219he7hbt7av8am0enn41da1rh4.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:8080/auth/google/callback';
//////////////////
// Define Sign Up Controller
const signupRepository = new userauthRepository_1.default();
const signUpService = new UserSignUpService_1.default(signupRepository);
const signUpController = new UserSignupController_1.default(signUpService);
AuthRouter.post("/sign-up", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const requestBody = req.body;
        const User = yield signUpController.CreateSignUpController(requestBody);
        res.json(User);
    }
    catch (error) {
        next(error);
    }
}));
// AuthRouter.get(
//   "/unverified-users",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const Response = await signUpController.GetAllSignUpController();
//       res.send(Response);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
// AuthRouter.get(
//   "/unverified-users/:id",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const User = await signUpController.GetSignUpById(req.params.id);
//       res.send(User);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
// AuthRouter.put(
//   "/unverified-users/:id",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const SignUpID = req.params.id;
//       const UpdateData = req.body;
//       const updated = await signUpController.UpdateSignUpController(
//         SignUpID,
//         UpdateData
//       );
//       if (updated) {
//         res.status(200).json(updated);
//       } else {
//         res.status(404).json({ message: " Not Found" });
//       }
//     } catch (error) {}
//   }
// );
// // // delete card
// AuthRouter.delete(
//   "/unverified-users/:id",
//   async (req: Request, res: Response, next: NextFunction) => {
//     const CardID = req.params.id;
//     try {
//       const cardDelete = await signUpController.DeleteSignUpContrioller(CardID);
//       if (!cardDelete) {
//         res.status(404).json({ message: " Not Found" });
//       } else {
//         res.status(200).json({ message: "deleted Successfully" });
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// );
// Verify route
// TODO:
// 1. Check If Token is Exist
// 2. Check If Token is Expired
// 2.1. Yes: Remove Token from Verification Collection
// 2.2 No: Send Message "User need to check email"
// 3. Modify isVerified to true
// 4. Publish authDetail (firstname, lastname) to User Service
AuthRouter.get("/verify/:token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        // Step 1.
        const VerifittEnty = yield UserVerifycation_1.VerificationModel.findOne({ token: token });
        console.log("Token", VerifittEnty);
        if (!VerifittEnty) {
            return res.status(404).send("Token not found");
        }
        // Step 2.
        if (VerifittEnty.expiresAt < new Date()) {
            return res.status(401).send("Token has expired");
        }
        // Step 3.
        const authDetail = yield UserAuth_1.AuthModel.findOneAndUpdate(VerifittEnty.userId, { isVerified: true }, { new: true });
        if (!authDetail) {
            return res.status(404).send("User Not Found");
        }
        console.log("authDetail", authDetail);
        // Step 4.
        const userProfile = yield UserProfielModel_1.UserModel.findOne({ email: authDetail.email });
        console.log("UserProfile", userProfile);
        if (!userProfile) {
            yield UserProfielModel_1.UserModel.create({
                firstName: authDetail.firstName,
                lastName: authDetail.lastName,
                email: authDetail.email,
                contactPhone: "",
                gender: "",
                location: "",
                dateOfBirth: "",
                nationality: "",
                address: "",
                educationBackground: "",
            });
            const newUserProfile = yield UserProfielModel_1.UserModel.findOne({
                email: authDetail.email,
            });
            // create JWT
            const JWTpayload = { userid: newUserProfile._id };
            const jwtSecret = "sal2302"; // Replace with your secret key
            const jwtOptions = { expiresIn: "1h" }; // Token expires in 1 hour
            const jwttoken = jsonwebtoken_1.default.sign(JWTpayload, jwtSecret, jwtOptions);
            console.log(jwttoken);
            console.log("Create User Profile Successfully");
            return res.json({
                token: jwttoken,
                message: "Email verified successfully",
            });
        }
        console.log("User Profile with this email already created");
        res.send("This email used before!!!!");
    }
    catch (error) {
        console.error("Error verifying email:", error);
        res.status(500).send("Error verifying email");
    }
}));
// re-verify token
AuthRouter.post("/reverify", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        // Call the resendVerificationToken function
        const result = yield (0, resendVerificationToken_1.default)(email);
        // Handle the result
        if (result.status === "Success") {
            return res.status(200).send(result.message);
        }
        else {
            return res.status(404).send(result.message);
        }
    }
    catch (error) {
        console.error("Error re-verifying email:", error);
        res.status(500).send("Error re-verifying email");
    }
}));
// login rout
AuthRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // check email
        const Email = yield UserAuth_1.AuthModel.findOne({ email });
        // check password
        const passwordMatch = yield bcrypt_1.default.compare(password, Email.password);
        if (!Email && !passwordMatch) {
            return res.status(401).json({ message: "Incorrect email or password" });
        }
        else {
            return res.status(200).json({ message: "login successfully" });
        }
    }
    catch (error) {
        console.log(error);
    }
}));
///  login with google
// Initiates the Google Login flow
AuthRouter.get("/google", (req, res) => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
    res.redirect(url);
});
// Callback URL for handling the Google Login response
AuthRouter.get("/auth/google/callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code } = req.query;
    try {
        // Exchange authorization code for access token
        const { data } = yield axios_1.default.post("https://oauth2.googleapis.com/token", {
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            code,
            redirect_uri: REDIRECT_URI,
            grant_type: "authorization_code",
        });
        const { access_token, id_token } = data;
        // Use access_token or id_token to fetch user profile
        const { data: profile } = yield axios_1.default.get("https://www.googleapis.com/oauth2/v1/userinfo", {
            headers: { Authorization: `Bearer ${access_token}` },
        });
        // Code to handle user authentication and retrieval using the profile data
        res.redirect("/");
    }
    catch (error) {
        console.error("Error:", error.response.data.error);
        res.redirect("/login");
    }
}));
// Logout route
AuthRouter.get("/logout", (req, res) => {
    // Code to handle user logout
    res.redirect("/login");
});
exports.default = AuthRouter;
