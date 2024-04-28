
import { AuthModel } from "../../model/AuthModel/UserAuth";
import { Verification,VerificationModel } from "../../model/VerifyModel/UserVerifycation";
import { generateToken } from "../GenerateToken";
import { sendVerificationEmail } from "../sentemailverifytoken/sentverifyusertoken";

async function resendVerificationToken(email: string): Promise<any> {
    try {
      // Find user by email
      const existingUser = await AuthModel.findOne({ email });
  
      if (!existingUser) {
        return {
          status: "Error",
          message: "User not found",
        };
      }
  
      // Find existing verification entry
      const existingVerification = await VerificationModel.findOne({ userId: existingUser._id });
  
      if (!existingVerification) {
        return {
          status: "Error",
          message: "Verification token not found",
        };
      }
  
      // Generate a new token
      const newToken = generateToken();
  
      // Update existing verification entry with new token and expiration time
      existingVerification.token = newToken;
      existingVerification.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // Expires in 24 hours
      await existingVerification.save();
  
      // Resend verification email with the new token
      await sendVerificationEmail(email, newToken);
  
      return {
        status: "Success",
        message: "New verification token generated and resent successfully",
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  export default resendVerificationToken
  