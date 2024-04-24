import express, { Router, Request, Response, NextFunction } from "express";
import { SignUpController } from "../../controller/AuthController/SignupController";
import { SignUpService } from "../../service/AuthService/SignUpService";
import { SignUpRepository } from "../../repository/Auth/SignUpRepository";
import { VerificationModel } from "../../model/Verifycation";
import { Auth, AuthModel } from "../../model/Auth";
import { UserModel,UserProfille } from "../../model/UserProfielModel";
import { error } from "console";
const SignUprouter: Router = express.Router();
const VerifyRoute: Router = express.Router();
const signupRepository = new SignUpRepository();
const signupService = new SignUpService(signupRepository);
const signupController = new SignUpController(signupService);

SignUprouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Hello");
    try {
      const requestBody = req.body;
      const User = await signupController.CreateSignUpController(requestBody);
      res.json(User);
    } catch (error) {
      next(error);
    }
  }
);
// get all card
SignUprouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Response = await signupController.GetAllSignUpController();
    res.send(Response);
  } catch (error) {
    console.log(error);
  }
});
// // get card by id
SignUprouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const User = await signupController.GetSignUpById(req.params.id);
      res.send(User);
    } catch (error) {
      console.log(error);
    }
  }
);
// // update card
SignUprouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const SignUpID = req.params.id;
      const UpdateData = req.body;
      const updated = await signupController.UpdateSignUpController(
        SignUpID,
        UpdateData
      );

      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: " Not Found" });
      }
    } catch (error) {}
  }
);

// // delete card

SignUprouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const CardID = req.params.id;
    try {
      const cardDelete = await signupController.DeleteSignUpContrioller(CardID);
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

VerifyRoute.get("/:token", async (req, res) => {
  try {
    const { token } = req.params;
    console.log(token)

    // Find the token in the database
    const VerifittEnty = await VerificationModel.findOne({ "token": token });
    console.log(VerifittEnty )

    if (!VerifittEnty ) {
      return res.status(404).send("Token not found");
    }
    // Check token expiration
    if (VerifittEnty .expiresAt < new Date()) {
      //    await deleteExpiredUsers()
      return res.status(401).send("Token has expired");
    }

    await AuthModel.findOneAndUpdate(
      VerifittEnty.userId,
      { isVerified: true }
    );

    // Fetc first name and Last name from Auth
    const Authuser = await AuthModel.findById(VerifittEnty.userId)
    if (!Authuser){
      return res.status(404).send("User Not Found");
    }

    
    // Create or Update UserProfile with firstName and lastName
    const userProfile = await UserModel.findOne({ email: Authuser.email });

    if (userProfile) {
      // userProfile.firstName = Authuser.firstName;
      // userProfile.lastName = Authuser.lastName;
      // await userProfile.save();
      console.log(error)
    } else {
      await UserModel.create({
        firstName: Authuser.firstName,
        lastName: Authuser.lastName,
        email: Authuser.email,
        // other fields can be initialized with default values or left blank
      });
    }

    // Redirect user to a success page or send a response
    res.send("Email verified successfully");
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).send("Error verifying email");
  }
});


export { SignUprouter, VerifyRoute };
