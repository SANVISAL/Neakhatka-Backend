import UserRepository from "../database/repository/user.repository";
import {
  ValidatePassword,
  generatePassword,
  generateSignature,
} from "../utils/jwt";
import { UserSignUpResult, UserSignupParams } from "./@types/user.service.type";
import { AccountVerificationRepository } from "../database/repository/account-verication-repository";
import { generateEmailVerication } from "../utils/account-verification";
import accountVerificationModel from "../database/model/account-verify";
import { publishDirectMessage } from "../queues/auth.producer";
import { authChannel } from "../server";
import { UsersignInSchemType } from "../schema/@types/user";
import DuplicateError from "../errors/duplicate-error";
import APIError from "../errors/api-error";
import { StatusCode } from "../utils/consts";
import { logger } from "../utils/logger";

class UserService {
  private userRepo: UserRepository;
  private verificationRepo: AccountVerificationRepository;

  constructor() {
    this.userRepo = new UserRepository();
    this.verificationRepo = new AccountVerificationRepository();
  }
  // async Create(UserDetail: UserSignupParams): Promise<UserSignUpResult> {
  //   try {
  //     const hashPassword =
  //       UserDetail.password && (await generatePassword(UserDetail.password));
  //     let newUserParams = { ...UserDetail };
  //     if (hashPassword) {
  //       newUserParams = { ...newUserParams, password: hashPassword };
  //     }
  //     const newuser = await this.userRepo.CreateUser(newUserParams);
  //     return newuser;
  //   } catch (error) {
  //     console.log(error);
  //     if (error instanceof DubplicateError) {
  //       const existedUser = await this.userRepo.FindUser({
  //         email: UserDetail.email,
  //       });
  //       if (!existedUser?.isVerified) {
  //         const token = await this.verificationRepo.FindVericationTokenbyID({
  //           id: existedUser!._id,
  //         });
  //         if (!token) {
  //           console.log("Token not found!");
  //         }
  //         const messageDetail = {
  //           recicerEmail: existedUser!.email,
  //           verifylink: `${token?.emailVerificationToken}`,
  //           template: "verifyEmail",
  //         };
  //         publishDirectMessage(
  //           authChannel,
  //           "email-notification",
  //           "auth email",
  //           JSON.stringify(messageDetail),
  //           "Verify email message has been send"
  //         );
  //       } else {
  //         console.log("email aleady  exist! please login");
  //         throw error;
  //       }
  //     }
  //     throw error;
  //   }
  // }

  async Create(userDetail: UserSignupParams): Promise<UserSignUpResult> {
    try {
      // Step 1
      const hashedPassword =
        userDetail.password && (await generatePassword(userDetail.password));

      let newUserParams = { ...userDetail };

      if (hashedPassword) {
        newUserParams = { ...newUserParams, password: hashedPassword };
      }

      // Step 2
      const newUser = await this.userRepo.CreateUser(newUserParams);

      return newUser;
    } catch (error: unknown) {
      // Step 3
      if (error instanceof DuplicateError) {
        const existedUser = await this.userRepo.FindUser({
          email: userDetail.email,
        });

        if (!existedUser?.isVerified) {
          // Resent the token
          const token = await this.verificationRepo.FindVerificationTokenById({
            id: existedUser!._id,
          });

          if (!token) {
            logger.error(`UserService Create() method error: token not found!`);
            throw new APIError(
              `Something went wrong!`,
              StatusCode.InternalServerError
            );
          }

          const messageDetails = {
            receiverEmail: existedUser!.email,
            verifyLink: `${token.emailVerificationToken}`,
            template: "verifyEmail",
          };

          // Publish To Notification Service
          await publishDirectMessage(
            authChannel,
            "email-notification",
            "auth-email",
            JSON.stringify(messageDetails),
            "Verify email message has been sent to notification service"
          );

          // Throw or handle the error based on your application's needs
          throw new APIError(
            "A user with this email already exists. Verification email resent.",
            StatusCode.Conflict
          );
        } else {
          throw new APIError(
            "A user with this email already exists. Please login.",
            StatusCode.Conflict
          );
        }
      }
      throw error;
    }
  }

  ///
  async SaveVerificationToken({ userId }: { userId: string }) {
    try {
      const emailVerificationToken = generateEmailVerication();
      const accountverification = new accountVerificationModel({
        userId,
        emailVerificationToken,
      });

      const newAccountVerification = await accountverification.save();
      return newAccountVerification;
    } catch (error) {
      throw error;
    }
  }

  // async VerifivationToken({ token }: { token: string }): Promise<any> {
  //   const istokenExsit = await this.verificationRepo.FindVerificationTokenById({
  //     token,
  //   });
  //   if (!istokenExsit) {
  //     console.log("token not found");
  //     return;
  //   }
  //   const user = await this.userRepo.FinduserById({
  //     id: istokenExsit?.userId.toString(),
  //   });
  //   if (!user) {
  //     return "user not exsited";
  //   }
  //   user.isVerified = true;
  //   await user.save();
  //   await this.verificationRepo.DeleteVerificationToken({ token });
  //   return user;
  // }

  async VerifyEmailToken({ token }: { token: string }) {
    const isTokenExist = await this.verificationRepo.FindVerificationToken({
      token,
    });

    if (!isTokenExist) {
      throw new APIError(
        "Verification token is invalid",
        StatusCode.BadRequest
      );
    }

    // Find the user associated with this token
    const user = await this.userRepo.FinduserById({
      id: isTokenExist.userId.toString(),
    });
    if (!user) {
      throw new APIError("User does not exist.", StatusCode.NotFound);
    }

    // Mark the user's email as verified
    user.isVerified = true;
    await user.save();

    // Remove the verification token
    await this.verificationRepo.DeleteVerificationToken({ token });

    return user;
  }

  async FindUserByEmail({ email }: { email: string }) {
    try {
      const user = await this.userRepo.FindUser({ email });
      return user;
    } catch (error) {}
  }

  async UpdateUser({ id, update }: { id: string; update: object }) {
    try {
      const user = await this.userRepo.FinduserById({ id });
      if (!user) {
        return "User not Found";
      }
      const Updateuser = await this.userRepo.UpdateUserById({ id, update });
      return Updateuser;
    } catch (error) {
      console.log(error);
    }
  }
  // Todo login
  async Login(UserDetail: UsersignInSchemType) {
    const user = await this.userRepo.FindUser({ email: UserDetail.email });
    if (!user) {
      return "User not Exist";
    }
    const isPwcorrect = await ValidatePassword({
      enterpassword: UserDetail.password,
      savedPassword: user.password as string,
    });
    if (!isPwcorrect) {
      return "Email or Password incorrect";
    }
    const token = await generateSignature({ userID: user._id });
    return token;
  }
}

export default UserService;
