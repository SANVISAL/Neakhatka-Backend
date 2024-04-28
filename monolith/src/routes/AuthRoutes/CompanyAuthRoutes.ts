import express, { Router, Request, Response, NextFunction } from "express";
import CompanyAuthController from "../../controller/AuthController/CompanyAuth";
import CompanyAuthtService from "../../service/AuthService/CompanyAuthService";
import CompanyAuthRepository from "../../repository/Auth/companyAuth";
import {
  CompanyVerificationModel,
  CompanyVerification,
} from "../../model/VerifyModel/CompanyVerifyEmail";
import { CompanyModel } from "../../model/ProfileModel/CompanyProfile";
import { CompanyAuthModel } from "../../model/AuthModel/CompanyAuth";

const companyauthrouter: Router = express.Router();
const companyverifyRoute: Router = express.Router();
const authRepository = new CompanyAuthRepository();
const authService = new CompanyAuthtService(authRepository);
const authController = new CompanyAuthController(authService);

companyauthrouter.post(
  "/sign-up",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Hello");
    try {
      const requestBody = req.body;
      const User = await authController.SignUpController(requestBody);
      res.json(User);
    } catch (error) {
      next(error);
    }
  }
);
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

companyauthrouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const CardID = req.params.id;
    try {
      const cardDelete = await authController.DeleteSignUp(CardID);
      if (!cardDelete) {
        res.status(404).json({ message: " Not Found" });
      } else {
        res.status(200).json({ message: "deleted Successfully" });
      }
    } catch (error) {
      next(error);
    }
  }
);

// Verify route
// TODO:
// 1. Check If Token is Exist
// 2. Check If Token is Expired
// 2.1. Yes: Remove Token from Verification Collection
// 2.2 No: Send Message "Company need to check email"
// 3. Modify isVerified to true
// 4. Publish authDetail (firstname, lastname) to User Service
companyauthrouter.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;

    // Step 1.
    const VerifittEnty = await CompanyVerificationModel.findOne({
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
    const companyauthDetail = await CompanyAuthModel.findOneAndUpdate(
      VerifittEnty.CompanyId,
      { isVerified: true },
      { new: true }
    );

    if (!companyauthDetail) {
      return res.status(404).send("User Not Found");
    }
    console.log("companyauthDetail", companyauthDetail);

    // Step 4.
    const companyProfile = await CompanyModel.findOne({
      email: companyauthDetail.email,
    });
    console.log("CompanyProfile", companyProfile);

    if (!companyProfile) {
      await CompanyModel.create({
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
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).send("Error verifying email");
  }
});

export default companyauthrouter;
