import {
  Controller,
  Get,
  Post,
  Body,
  Middlewares,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import axios from "axios";
import { ROUTE_PATH } from "../routes/v1/routes-refer";
import UserService from "../service/user.service";
import { generateSignature } from "../utils/jwt";
import { UserSignInSchema, UsersignUpSchema } from "../schema/user-schema"; 
import AuthModel from "../database/model/user.repository"; // Ensure correct path
import { publishDirectMessage } from "../queues/auth.producer";
import { authChannel } from "../server";
import { IAuthUserMessageDetails } from "../queues/@types/auth.type";
import { StatusCode } from "../utils/consts";
import { logger } from "../utils/logger";
import APIError from "../errors/api-error";
import validateInput from "../middlewares/validate-input";

interface SignUpRequestBody {
  username: string;
  email: string;
  password: string;
  role: string;
}

@Route(`/v1/auth`)
export class AuthController extends Controller {
  // TODO:
  // 1. Save User
  // 2. Generate Verification Token & Save to its DB
  // 2. Publish User Detail to Notification Service
  @SuccessResponse(StatusCode.Created, "Created")
  @Post(ROUTE_PATH.AUTH.SIGN_UP)
  @Middlewares(validateInput(UsersignUpSchema))
  public async SignUpWithEmail(
    @Body() requestBody: SignUpRequestBody
  ): Promise<any> {
    try {
      const { username, email, password, role } = requestBody;

      // Step 1.
      const userService = new UserService();
      const newUser = await userService.Create({
        username,
        email,
        password,
        role,
      });

      // Step 2.
      const verificationToken = await userService.SaveVerificationToken({
        userId: newUser._id,
      });

      const messageDetails = {
        reciverEmail: newUser.email,
        verifyLink: `${verificationToken?.emailVerificationToken}`,
        template: "verifyEmail",
      };

      // Publish To Notification Service
      await publishDirectMessage(
        authChannel,
        "neakhatka-email-notification",
        "auth-email",
        JSON.stringify(messageDetails),
        "Verify email message has been sent to notification service"
      );

      return {
        message: "Sign up successfully. Please verify your email.",
        // data: newUser,
      };
    } catch (error) {
      throw error;
    }
  }

  // TODO:
  // 1. Verify Token
  // 2. Generate JWT
  // 3. Publish User Detail to User Service
  @SuccessResponse(StatusCode.OK, "OK")
  @Get(ROUTE_PATH.AUTH.VERIFY)
  public async VerifyEmail(
    @Query() token: string
  ): Promise<{ message: string; token: string }> {
    // Using Response type for more flexible error handling.
    try {
      const userService = new UserService();

      // Step 1.
      const user = await userService.VerifyEmailToken({ token });

      // Step 2.
      const jwtToken = await generateSignature({
        userId: user._id,
      });

      // Step 3.
      const userDetail = await userService.FindUserByEmail({
        email: user.email,
      });

      if (!userDetail) {
        logger.error(
          `AuthController VerifyEmail() method error: user not found`
        );
        throw new APIError(
          `Something went wrong`,
          StatusCode.InternalServerError
        );
      }

      const messageDetails: IAuthUserMessageDetails = {
        username: userDetail?.username,
        email: userDetail?.email,
        type: "auth",
      };

      await publishDirectMessage(
        authChannel,
        "neakhatka-user-update",
        "user-applier",
        JSON.stringify(messageDetails),
        "User details sent to user service"
      );

      return { message: "User verify email successfully", token: jwtToken };
    } catch (error) {
      throw error;
    }
  }

  // login
  @SuccessResponse(StatusCode.OK, "OK")
  @Get(ROUTE_PATH.AUTH.LOGIN)
  @Middlewares(validateInput(UserSignInSchema))
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
          username: profile.given_name,
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
}
