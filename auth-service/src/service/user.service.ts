import UserRepository from "../database/repository/user.repository";
import DubplicateError from "../errors/duplicate-error";
import { generatePassword } from "../utils/jwt";
import { UserSignUpResult, UserSignupParams } from "./@types/user.service.type";
import accountVerificationRepository from "../database/repository/account-verication-repository";
import { generateEmailVerication } from "../utils/account-verification";
import accountVerificationModel from "../database/model/account-verify";
class UserService {
  private userRepo: UserRepository;
  private verificationRepo: accountVerificationRepository;

  constructor() {
    this.userRepo = new UserRepository();
    this.verificationRepo = new accountVerificationRepository();
  }
  async Create(UserDetail: UserSignupParams): Promise<UserSignUpResult> {
    try {
      const hashPassword =
        UserDetail.password && (await generatePassword(UserDetail.password));
      let newUserParams = { ...UserDetail };
      if (hashPassword) {
        newUserParams = { ...newUserParams, password: hashPassword };
      }
      const newuser = await this.userRepo.CreateUser(newUserParams);
      return newuser;
    } catch (error) {
      console.log(error);
      if (error instanceof DubplicateError) {
        const existedUser = await this.userRepo.FindUser({
          email: UserDetail.email,
        });
        if (!existedUser?.isVerified) {
          const token = await this.verificationRepo.FindVericationTokenbyID({
            id: existedUser!._id,
          });
          if (!token) {
            console.log("Token not found!");
          }
          // const messageDetail = {
          //   recicerEmail: existedUser!.email,
          //   verifylink: `${token?.emailVerificationToken}`,
          //   template: "verifyEmail",
          // };
        }
      }
      throw error;
    }
  }
  ///
  async SaveVerificationToken({ userID }: { userID: string }) {
    try {
      const emailVerificationToken = generateEmailVerication();
      const accountverification = new accountVerificationModel({
        userID,
        emailVerificationToken,
      });

      const newAccountVerification = await accountverification.save();
      return newAccountVerification;
    } catch (error) {
      console.log(error);
    }
  }

  async VerifivationToken({ token }: { token: string }):Promise<any> {
    const istokenExsit = await this.verificationRepo.FindVeificationToken({
      token,
    });
    if (!istokenExsit) {
      console.log("token not found");
      return;
    }
    const user = await this.userRepo.FinduserByID({
      id: istokenExsit?.userID.toString(),
    });
    if (!user) {
      return "user not exsited";
    }
    user.isVerified = true;
    await user.save();
    await this.verificationRepo.DeleteVerificationToken({ token });
    return user;
  }
  async FindUserByEmail({ email }: { email: string }) {
    try {
      const user = await this.userRepo.FindUser({ email });
      return user;
    } catch (error) {}
  }
}

export default UserService;
