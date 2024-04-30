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
const CompanyAuth_1 = __importDefault(require("../../controller/AuthController/CompanyAuth"));
const CompanyAuthService_1 = __importDefault(require("../../service/AuthService/CompanyAuthService"));
const companyAuth_1 = __importDefault(require("../../repository/Auth/companyAuth"));
const CompanyVerifyEmail_1 = require("../../model/VerifyModel/CompanyVerifyEmail");
const CompanyProfile_1 = require("../../model/ProfileModel/CompanyProfile");
const CompanyAuth_2 = require("../../model/AuthModel/CompanyAuth");
const companyauthrouter = express_1.default.Router();
// const companyverifyRoute: Router = express.Router();
const authRepository = new companyAuth_1.default();
const authService = new CompanyAuthService_1.default(authRepository);
const authController = new CompanyAuth_1.default(authService);
companyauthrouter.post("/sign-up", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Hello");
    try {
        const requestBody = req.body;
        const User = yield authController.SignUpController(requestBody);
        res.json(User);
    }
    catch (error) {
        next(error);
    }
}));
// get all card
// CompanySignUprouter.get(
//   "/",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const Response = await authController.GetAllSignUpController();
//       res.send(Response);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
// get card by id
// CompanySignUprouter.get(
//   "/:id",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const User = await authController.GetSignUpById(req.params.id);
//       res.send(User);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
// // update company sign up
// CompanySignUprouter.put(
//   "/:id",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const SignUpID = req.params.id;
//       const UpdateData = req.body;
//       const updated = await authController.UpdateSignUpController(
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
// // delete card
companyauthrouter.delete("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const CardID = req.params.id;
    try {
        const cardDelete = yield authController.DeleteSignUp(CardID);
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
// TODO:
// 1. Check If Token is Exist
// 2. Check If Token is Expired
// 2.1. Yes: Remove Token from Verification Collection
// 2.2 No: Send Message "Company need to check email"
// 3. Modify isVerified to true
// 4. Publish authDetail (firstname, lastname) to User Service
companyauthrouter.get("/verify/:token", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token } = req.params;
        // Step 1.
        const VerifittEnty = yield CompanyVerifyEmail_1.CompanyVerificationModel.findOne({
            token: token,
        });
        console.log("Token", VerifittEnty);
        if (!VerifittEnty) {
            return res.status(404).send("Token not found");
        }
        // Step 2.
        if (VerifittEnty.expiresAt < new Date()) {
            return res.status(401).send("Token has expired");
        }
        // Step 3.
        const companyauthDetail = yield CompanyAuth_2.CompanyAuthModel.findOneAndUpdate(VerifittEnty.CompanyId, { isVerified: true }, { new: true });
        if (!companyauthDetail) {
            return res.status(404).send("User Not Found");
        }
        console.log("companyauthDetail", companyauthDetail);
        // Step 4.
        const companyProfile = yield CompanyProfile_1.CompanyModel.findOne({
            email: companyauthDetail.email,
        });
        console.log("CompanyProfile", companyProfile);
        if (!companyProfile) {
            yield CompanyProfile_1.CompanyModel.create({
                companyName: companyauthDetail.CompanyName,
                contactPhone: "",
                websiteLink: null,
                location: "",
                contactEmail: "",
                contactPerson: "",
                numberOfEmployees: "",
                address: "",
                companyDescription: "",
            });
            console.log("Create Company Profile Successfully");
            return res.send("Email verified successfully");
        }
        console.log("Company Profile with this email already created");
        res.send("This email used before");
    }
    catch (error) {
        console.error("Error verifying email:", error);
        res.status(500).send("Error verifying email");
    }
}));
exports.default = companyauthrouter;
