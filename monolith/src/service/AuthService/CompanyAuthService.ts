import {
  CompanyAuth,
  CompanyAuthModel,
} from "../../model/AuthModel/CompanyAuth";
import CompanyAuthRepository from "../../repository/Auth/companyAuth";
import { generateToken } from "../../utils/GenerateToken";
import {
  CompanyVerificationModel,
  CompanyVerification,
} from "../../model/VerifyModel/CompanyVerifyEmail";
import crypto from "crypto"; // Import crypto for token generation
import bcrypt from "bcrypt";
import { sendVerificationcomapnyEmail } from "../../utils/sentemailverifytoken/sentverifycompanytoken";

class CompanyAuthService {
  private authRepository: CompanyAuthRepository;
  constructor(authRepository: CompanyAuthRepository) {
    this.authRepository = authRepository;
  }
  // service create sign up
  async SignupService(SignUpData: CompanyAuth): Promise<any> {
    try {
      // hash password
      if (SignUpData.password) {
        const hashpassword = await bcrypt.hash(SignUpData.password, 10);
        SignUpData.password = hashpassword;
      }
      const company_signup = new CompanyAuthModel(SignUpData);
      const new_Sign_Up = await company_signup.save();

      // generate token
      const token = generateToken();
      // save it to verify collection
      const newVerification = new CompanyVerificationModel({
        CompanyId: new_Sign_Up._id,
        token,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      });
      await newVerification.save();
      await sendVerificationcomapnyEmail(
        SignUpData.email,
        newVerification.token
      );
      return {
        status: "Succecss",
        message: "Sign Up Successfully",
      };
    } catch (error) {
      console.log(error);
    }
  }
  // seervice get all sign up
  async GetAllSignUpService(): Promise<CompanyAuth[]> {
    try {
      return await this.authRepository.GetAllSignUp();
    } catch (error) {
      throw error;
    }
  }
  // service get sign up by id
  async GetByIdService(id: string): Promise<CompanyAuth | null> {
    try {
      return await this.authRepository.FindById(id);
    } catch (error) {
      console.log(error);
    }
  }

  // service update sign up
  async UpdateSignUpService(
    id: string,
    UpdateData: Partial<CompanyAuth>
  ): Promise<CompanyAuth | null> {
    try {
      return await this.authRepository.UpdateSignUp(id, UpdateData);
    } catch (error) {
      throw error;
    }
  }

  // delete sign up service
  async DeleteSignupService(id: string): Promise<CompanyAuth | null> {
    try {
      return await this.authRepository.Delete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default CompanyAuthService;
