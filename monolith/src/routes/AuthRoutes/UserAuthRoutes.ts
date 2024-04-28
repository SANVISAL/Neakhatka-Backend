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
import resendVerificationToken from "../../utils/resentverifytoken/resendVerificationToken";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import axios from "axios";
const AuthRouter: Router = express.Router();

///////////////////
const CLIENT_ID =
  "97636232967-bji9b16dm6ea44oipv2ouchpq7evk13p.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:8080/auth/google/callback";
//////////////////

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
      const newUserProfile = await UserModel.findOne({
        email: authDetail.email,
      });
      // create JWT
      const JWTpayload = { userid: newUserProfile._id };
      const jwtSecret = "sal2302"; // Replace with your secret key
      const jwtOptions = { expiresIn: "1h" }; // Token expires in 1 hour
      const jwttoken = jwt.sign(JWTpayload, jwtSecret, jwtOptions);
      console.log(jwttoken);

      console.log("Create User Profile Successfully");
      return res.json({
        token: jwttoken,
        message: "Email verified successfully",
      });
    }
    console.log("User Profile with this email already created");
    res.send("This email used before!!!!");
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).send("Error verifying email");
  }
});

// re-verify token
AuthRouter.post("/reverify", async (req, res) => {
  try {
    const { email } = req.body;

    // Call the resendVerificationToken function
    const result = await resendVerificationToken(email);

    // Handle the result
    if (result.status === "Success") {
      return res.status(200).send(result.message);
    } else {
      return res.status(404).send(result.message);
    }
  } catch (error) {
    console.error("Error re-verifying email:", error);
    res.status(500).send("Error re-verifying email");
  }
});

// login rout

AuthRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // check email
    const Email = await AuthModel.findOne({ email });
    // check password
    const passwordMatch = await bcrypt.compare(password, Email.password);
    if (!Email && !passwordMatch) {
      return res.status(401).json({ message: "Incorrect email or password" });
    } else {
      return res.status(200).json({ message: "login successfully" });
    }
  } catch (error) {
    console.log(error);
  }
});

///  login with google
// Initiates the Google Login flow
AuthRouter.get("/google", (req: Request, res: Response) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
  res.redirect(url);
});

// Callback URL for handling the Google Login response
AuthRouter.get("/auth/google/callback", async (req: Request, res: Response) => {
  const { code } = req.query;

  try {
    // Exchange authorization code for access token
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const { access_token, id_token } = data;

    // Use access_token or id_token to fetch user profile
    const { data: profile } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );

    // Code to handle user authentication and retrieval using the profile data

    res.redirect("/");
  } catch (error) {
    console.error("Error:", error.response.data.error);
    res.redirect("/login");
  }
});

// Logout route
AuthRouter.get("/logout", (req: Request, res: Response) => {
  // Code to handle user logout
  res.redirect("/login");
});

export default AuthRouter;
