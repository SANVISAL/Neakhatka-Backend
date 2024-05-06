import { UserSignUpResult } from "../../service/@types/user.service.type";
import AuthModel from "../model/user.repository";
import {
  UserCreateRepository,
  //   UserUpdateRepository,
} from "./@types/user.repository.type";

class UserRepository {
  async CreateUser(
    UserDetail: UserCreateRepository
  ): Promise<UserSignUpResult> {
    try {
      const existingUser = await this.FindUser({ email: UserDetail.email });
      if (existingUser) {
        console.log("Email have been useed before");
      }
      const newUser = new AuthModel(UserDetail);
      const userResult = await newUser.save();
      return userResult as UserSignUpResult;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async FindUser({ email }: { email: string }) {
    try {
      const existingUser = await AuthModel.findOne({ email: email });
      return existingUser;
    } catch (error) {
      console.log(error);
    }
  }
  
  async FinduserByID({id}:{id:string}){
    try{
      const existedUser = await AuthModel.findById(id);
      return existedUser
    }catch(error){
      console.log("Unable to Fine user in database")
    }
  }
}

export default UserRepository;
