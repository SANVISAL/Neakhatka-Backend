import { IAuthDocument } from "../../database/model/user.repository";

export interface UserSignUpResult extends IAuthDocument {}
export interface UserSignInResult extends IAuthDocument {}

export interface UserSignupParams {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  role: string;
  isVerified?: boolean;
  googleId?: string;
}
