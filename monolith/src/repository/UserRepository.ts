import { UserModel, UserProfille } from "../model/UserProfielModel";
// import { EmailPassword, EmailPasswordModel } from "../model/EmailPasswordModel";

export class UserRepository {
  // get all user profile 
  async GetAllUserRepo(): Promise<UserProfille[]> {
    try {
      return await UserModel.find();
    } catch (error) {
      throw error;
    }
  }
  // get profile by id
  async findById(id: string): Promise<UserProfille | null> {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      console.log(error);
    }
  }
  // update profile
  async updateUser(
    id: string,
    updateData: Partial<UserProfille>
  ): Promise<UserProfille | null> {
    try {
      return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  // delete profile
  async deleteUser(id: string): Promise<UserProfille | null> {
    try {
      return await UserModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
