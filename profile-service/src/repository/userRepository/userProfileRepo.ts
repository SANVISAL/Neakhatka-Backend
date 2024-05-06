import {
  UserProfile,
  IUserProfille,
} from "../../models/userprofile/userprofilel-model";
// import { EmailPassword, EmailPasswordModel } from "../model/EmailPasswordModel";

export class UserRepository {
  // get all user profile
  async GetAllUserRepo(): Promise<IUserProfille[]> {
    try {
      return await UserProfile.find();
    } catch (error) {
      throw error;
    }
  }
  // get profile by id
  async findById(id: string): Promise<IUserProfille | null> {
    try {
      return await UserProfile.findById(id);
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  // update profile
  async updateUser(
    id: string,
    updateData: Partial<IUserProfille>
  ): Promise<IUserProfille | null> {
    try {
      return await UserProfile.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  // delete profile
  async deleteUser(id: string): Promise<IUserProfille | null> {
    try {
      return await UserProfile.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
