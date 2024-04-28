import express, { Router, Request, Response, NextFunction } from "express";
import AuthController from "../../controller/AuthController/UserSignupController";
import AuthService from "../../service/AuthService/UserSignUpService";
import AuthRepository from "../../repository/Auth/userauthRepository";
import { VerificationModel } from "../../model/VerifyModel/UserVerifycation";
import { Auth, AuthModel } from "../../model/AuthModel/UserAuth";
import {
  UserModel,
  UserProfille,
} from "../../model/ProfileModel/UserProfielModel";

const AuthRouter: Router = express.Router();

// Define Sign Up Controller
const signupRepository = new AuthRepository();
const signUpService = new AuthService(signupRepository);
const signUpController = new AuthController(signUpService);

AuthRouter.post(
  "/sign-up",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const requestBody = req.body;
      const User = await signUpController.CreateSignUpController(requestBody);
      res.json(User);
    } catch (error) {
      next(error);
    }
  }
);

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
AuthRouter.get("/verify/:token", async (req, res) => {
  try {
    const { token } = req.params;

    // Step 1.
    const VerifittEnty = await VerificationModel.findOne({ token: token });
    console.log("Token", VerifittEnty);

    if (!VerifittEnty) {
      return res.status(404).send("Token not found");
    }

    // Step 2.
    if (VerifittEnty.expiresAt < new Date()) {
      return res.status(401).send("Token has expired");
    }

    // Step 3.
    const authDetail = await AuthModel.findOneAndUpdate(
      VerifittEnty.userId,
      { isVerified: true },
      { new: true }
    );

    if (!authDetail) {
      return res.status(404).send("User Not Found");
    }
    console.log("authDetail", authDetail);

    // Step 4.
    const userProfile = await UserModel.findOne({ email: authDetail.email });
    console.log("UserProfile", userProfile);

    if (!userProfile) {
      await UserModel.create({
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
      console.log("Create User Profile Successfully");
      return res.send("Email verified successfully");
    }
    console.log("User Profile with this email already created");
    res.send("This email used before!!!!");
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).send("Error verifying email");
  }
});

export default AuthRouter;
