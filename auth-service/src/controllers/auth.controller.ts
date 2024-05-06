import { Route, Post, Body, Get, Query } from "tsoa";
import { ROUTE_PATH } from "../routes/v1/routes-refer";
import UserService from "../service/user.service";
import { publicDirectMessage } from "../queues/auth.producer";
import { authChannel } from "../server";
import { generateSignature } from "../utils/jwt";
interface SignUpRequestBody {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
}

@Route("/v1/auth")
export class AuthController {
  @Post(ROUTE_PATH.AUTH.SIGN_UP)
  public async SignUpWithEmail(
    @Body() requestBody: SignUpRequestBody
  ): Promise<any> {
    try {
      const { firstname, lastname, email, password, role } = requestBody;
      const userService = new UserService();
      const newUser = await userService.Create({
        firstname,
        lastname,
        email,
        password,
        role,
      });
      const verificationToken = await userService.SaveVerificationToken({
        userID: newUser._id,
      });
      console.log(verificationToken);
      // message
      const messageDetail = {
        reciverEmail: newUser.email,
        verifyLink: `${verificationToken?.emailVerificationToken}`,
        template: "verify Email",
      };
      await publicDirectMessage(
        authChannel,
        "microsample-email-notification",
        "auth-email",
        JSON.stringify(messageDetail),
        "Verify email message has been sent to notification service"
      );

      return {
        message: "Sign up successfully",
        data: newUser,
      };
    } catch (error) {
      console.log(error);
    }
  }

  // verify email

  @Get(ROUTE_PATH.AUTH.VERIFY)
  public async VerifyEmail(
    @Query() token: string
  ): Promise<void> {  // Using Response type for more flexible error handling.
    try {
      const userService = new UserService();
      const user = await userService.VerifivationToken({ token });
  
      // Check if the user does not exist or other types of errors
      if (typeof user === "string") {
        console.log("User does not exist.");
        // return "User not found"; // Change this depending on your actual environment
      }
  
      const jwtToken = await generateSignature({ userID: user._id.toString() });
      const UserDetail = await userService.FindUserByEmail({ email: user.email });
  
      // Assuming UserDetail usage here
      if (!UserDetail) {
        console.log("User details not found.");
        // return { status: 404, json: { message: "User details not found" } }; // Adjust as needed
      }
  
      // If all goes well
      // return { status: 200, json: { message: "Verification successful", token: jwtToken } }; // Adjust return type accordingly
      console.log("verify success",jwtToken)
    } catch (error) {
      console.log("An error occurred: ", error);
      // return { status: 500, json: { message: "Internal Server Error" } }; // Generic error handling
    }
  }
}
