import { Auth, AuthModel } from "../../model/AuthModel/UserAuth";
import AuthRepository from "../../repository/Auth/userauthRepository";
import { generateToken } from "../../utils/GenerateToken";
import { VerificationModel } from "../../model/VerifyModel/UserVerifycation";
import bcrypt from "bcrypt";
import { sendVerificationEmail } from "../../utils/sentemailverifytoken/sentverifyusertoken";

class AuthService {
  private signupRepository: AuthRepository;
  constructor(cardRepository: AuthRepository) {
    this.signupRepository = cardRepository;
  }
  // service create sign up
  async CreateSignupService(SignUpData: Auth): Promise<any> {
    try {
      // hash password
      if (SignUpData.password) {
        const hashpassword = await bcrypt.hash(SignUpData.password, 10);
        SignUpData.password = hashpassword;
      }
      const user_signup = new AuthModel(SignUpData);
      const new_Sign_Up = await user_signup.save();

      // generate token
      const token = generateToken();
      // save it to verify collection
      const newVerification = new VerificationModel({
        userId: new_Sign_Up._id,
        token,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      await newVerification.save();
      await sendVerificationEmail(SignUpData.email, newVerification.token);
      return {
        status: "Succecss",
        message: "Sign Up Successfully",
      };
    } catch (error) {
      console.log(error);
    }
  }
  // seervice get all sign up
  async GetAllSignUpService(): Promise<Auth[]> {
    try {
      return await this.signupRepository.GetAllSignUp();
    } catch (error) {
      throw error;
    }
  }
  // service get sign up by id
  async GetByIdService(id: string): Promise<Auth | null> {
    try {
      return await this.signupRepository.findById(id);
    } catch (error) {
      console.log(error);
    }
  }

  // service update sign up
  async UpdateSignUpService(
    id: string,
    UpdateData: Partial<Auth>
  ): Promise<Auth | null> {
    try {
      return await this.signupRepository.updateSignUp(id, UpdateData);
    } catch (error) {
      throw error;
    }
  }

  // delete sign up service
  async DeleteSignupService(id: string): Promise<Auth | null> {
    try {
      return await this.signupRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
