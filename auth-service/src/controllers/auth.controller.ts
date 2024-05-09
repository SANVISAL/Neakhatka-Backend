import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import axios from "axios";
import { ROUTE_PATH } from "../routes/v1/routes-refer";
import UserService from "../service/user.service";
import { generateSignature } from "../utils/jwt";
import AuthModel from "../database/model/user.repository"; // Ensure correct path
import { publishDirectMessage } from "../queues/auth.producer";
import { authChannel } from "../server";
import { IAuthUserMessageDetails } from "../queues/@types/auth.type";
import { StatusCode } from "../utils/consts";

interface SignUpRequestBody {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
}

@Route(`/v1/auth`)
export class AuthController extends Controller {
  @Get(ROUTE_PATH.AUTH.GOOGLE)
  public async initiateGoogleLogin() {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=profile email`;
    return { url };
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Get(ROUTE_PATH.AUTH.GOOGLE_CALLBACK)
  public async GoogleAuthCallback(@Query() code: string) {
    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    const REDIRECT_URI = process.env.REDIRECT_URI;

    try {
      const { data } = await axios.post("https://oauth2.googleapis.com/token", {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      });

      const { access_token } = data;
      const { data: profile } = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        { headers: { Authorization: `Bearer ${access_token}` } }
      );

      console.log("profile", profile);

      let newUser = await AuthModel.findOne({ email: profile.email });
      if (!newUser) {
        newUser = new AuthModel({
          firstname: profile.given_name,
          lastname: profile.family_name,
          email: profile.email,
          isVerified: true,
          googleId: profile.id,
        });
        await newUser.save();
      }
      const jwtToken = await generateSignature({
        userId: newUser._id,
      });

      console.log(jwtToken);

      return {
        token: jwtToken,
        message: "Good Job",
      };
    } catch (error) {
      // console.error("Error during Google authentication:", error);
      this.setStatus(500); // Set the error status
      throw new Error("Error during Google authentication");
    }
  }

  @SuccessResponse(StatusCode.Created, "Created")
  @Post(ROUTE_PATH.AUTH.SIGN_UP)
  public async SignUpWithEmail(
    @Body() requestBody: SignUpRequestBody
  ): Promise<any> {
    const { firstname, lastname, email, password, role } = requestBody;
    const userService = new UserService();

    try {
      const newUser = await userService.Create({
        firstname,
        lastname,
        email,
        password,
        role,
      });
      const verificationToken = await userService.SaveVerificationToken({
        userId: newUser._id,
      });

      const messageDetail = {
        reciverEmail: newUser.email,
        verifyLink: `${verificationToken?.emailVerificationToken}`,
        template: "verify Email",
      };
      await publishDirectMessage(
        authChannel,
        "microsample-email-notification",
        "auth-email",
        JSON.stringify(messageDetail),
        "Verify email message has been sent to notification service"
      );

      this.setStatus(200); // setting HTTP status code
      // res.json({
      //   message: "Sign up successfully",
      //   data: newUser,
      // });
      return {
        message: "Sign up successfully",
        // data: newUser,
      };
    } catch (error) {
      throw error;
      // console.error("Sign up error:", error);
      // this.setStatus(500);
      // res.send("Error during sign up process.");
      // return {
      //   message: "Error during sign up process.",
      // };
    }
  }

  // verify email
  @SuccessResponse(StatusCode.OK, "OK")
  @Get(ROUTE_PATH.AUTH.VERIFY)
  public async VerifyEmail(@Query() token: string): Promise<void> {
    // Using Response type for more flexible error handling.
    try {
      const userService = new UserService();
      const user = await userService.VerifyEmailToken({ token });

      // Check if the user does not exist or other types of errors
      if (typeof user === "string") {
        console.log("User does not exist.");
        // return "User not found"; // Change this depending on your actual environment
      }

      const jwtToken = await generateSignature({ userID: user._id.toString() });
      const UserDetail = await userService.FindUserByEmail({
        email: user.email,
      });
      // Assuming UserDetail usage here
      if (!UserDetail) {
        console.log("User details not found.");
        // return { status: 404, json: { message: "User details not found" } }; // Adjust as needed
      }
      const messageDetail: IAuthUserMessageDetails = {
        firstname: UserDetail?.firstname,
        lastname: UserDetail?.lastname,
        email: UserDetail?.email,
        type: "auth",
      };
      await publishDirectMessage(
        authChannel,
        "Microsample-user-update",
        "user-applier",
        JSON.stringify(messageDetail),
        "User details Sent to user server"
      );

      // If all goes well
      // return { status: 200, json: { message: "Verification successful", token: jwtToken } }; // Adjust return type accordingly
      console.log("verify success", jwtToken);
    } catch (error) {
      console.log("An error occurred: ", error);
      // return { status: 500, json: { message: "Internal Server Error" } }; // Generic error handling
    }
  }

  // login
  @SuccessResponse(StatusCode.OK, "OK")
  @Get(ROUTE_PATH.AUTH.LOGIN)
  public async loginWithEmail(
    @Query() email: string,
    @Query() password: string
  ): Promise<{ token: string }> {
    try {
      // const { email, password } = requestBody;
      const userService = new UserService();
      const jwtToken = await userService.Login({
        email,
        password,
      });
      return { token: jwtToken };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
