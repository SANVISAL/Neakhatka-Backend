import UserService from "../services/user.service";
import { Route, Post, Middlewares, SuccessResponse, Query, Get } from "tsoa";
import { Body } from "tsoa";

import validateInput from "../middlewares/validate-input";
import { UserSignInSchema, UserSignUpSchema } from "../schema";
import { StatusCode } from "../utils/consts";
import { ROUTE_PATHS } from "../routes/v1/route-defs";
import { generateSignature } from "../utils/jwt";
import axios from "axios";
import { publishDirectMessage } from "../queues/auth.producer";
import { authChannel } from "../server";
import { logger } from "../utils/logger";
import APIError from "../errors/api-error";
import { IAuthUserMessageDetails } from "../queues/@types/auth.type";

interface SignUpRequestBody {
  username: string;
  email: string;
  password: string;
}

interface LoginRequestBody {
  email: string;
  password: string;
}

@Route("v1/auth")
export class AuthController {
  // TODO:
  // 1. Save User
  // 2. Generate Verification Token & Save to its DB
  // 2. Publish User Detail to Notification Service
  @SuccessResponse(StatusCode.Created, "Created")
  @Post(ROUTE_PATHS.AUTH.SIGN_UP)
  @Middlewares(validateInput(UserSignUpSchema))
  public async SignUpWithEmail(
    @Body() requestBody: SignUpRequestBody
  ): Promise<any> {
    try {
      const { username, email, password } = requestBody;

      // Step 1.
      const userService = new UserService();
      const newUser = await userService.Create({ username, email, password });

      // Step 2.
      const verificationToken = await userService.SaveVerificationToken({
        userId: newUser._id,
      });

      const messageDetails = {
        receiverEmail: newUser.email,
        verifyLink: `${verificationToken.emailVerificationToken}`,
        template: "verifyEmail",
      };

      // Publish To Notification Service
      await publishDirectMessage(
        authChannel,
        "microsample-email-notification",
        "auth-email",
        JSON.stringify(messageDetails),
        "Verify email message has been sent to notification service"
      );

      return {
        message: "Sign up successfully. Please verify your email.",
        data: newUser,
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
  @Get(ROUTE_PATHS.AUTH.VERIFY)
  public async VerifyEmail(
    @Query() token: string
  ): Promise<{ message: string; token: string }> {
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
        username: userDetail.username,
        email: userDetail.email,
        type: "auth",
      };

      await publishDirectMessage(
        authChannel,
        "microsample-user-update",
        "user-applier",
        JSON.stringify(messageDetails),
        "User details sent to user service"
      );

      return { message: "User verify email successfully", token: jwtToken };
    } catch (error) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Post(ROUTE_PATHS.AUTH.LOGIN)
  @Middlewares(validateInput(UserSignInSchema))
  public async LoginWithEmail(
    @Body() requestBody: LoginRequestBody
  ): Promise<{ token: string }> {
    try {
      const { email, password } = requestBody;

      const userService = new UserService();
      const jwtToken = await userService.Login({ email, password });

      return {
        token: jwtToken,
      };
    } catch (error) {
      throw error;
    }
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Get(ROUTE_PATHS.AUTH.GOOGLE)
  public async GoogleAuth() {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=profile email`;
    return { url };
  }

  @SuccessResponse(StatusCode.OK, "OK")
  @Get(ROUTE_PATHS.AUTH.GOOGLE_CALLBACK)
  public async GoogleAuthCallback(@Query() code: string) {
    try {
      // Exchange the code for tokens
      const { data } = await axios.post("https://oauth2.googleapis.com/token", {
        clientId: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        redirect_uri: process.env.REDIRECT_URI,
        grant_type: "authorization_code",
      });

      // Fetch user profile
      const profile = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo",
        {
          headers: { Authorization: `Bearer ${data.access_token}` },
        }
      );

      const userService = new UserService();
      const existingUser = await userService.FindUserByEmail({
        email: profile.data.email,
      });

      if (existingUser) {
        // User Exists, link the Google account if it's not already linked
        if (!existingUser.googleId) {
          await userService.UpdateUser({
            id: existingUser._id,
            updates: { googleId: profile.data.id, isVerified: true },
          });
        }

        // Now, proceed to log the user in
        const jwtToken = await generateSignature({
          userId: existingUser._id,
        });

        return {
          token: jwtToken,
        };
      }

      // No user exists with this email, create a new user
      const newUser = await userService.Create({
        username: profile.data.name,
        email: profile.data.email,
        isVerified: true,
        googleId: profile.data.id,
      });

      const jwtToken = await generateSignature({
        userId: newUser._id,
      });

      return {
        token: jwtToken,
      };
    } catch (error) {
      throw error;
    }
  }
}