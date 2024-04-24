import { UserModel, UserProfille } from "../model/UserProfielModel";
// import { EmailPassword, EmailPasswordModel } from "../model/EmailPasswordModel";

export class UserRepository {
  // repository for  create new card

  // async CreateNewUser(
  //   UserData: UserProfille,
  //   email: string,
  //   password: string
  // ): Promise<{ userProfile: UserProfille}> {
  //   try {
  //     // user profile
  //     const newuser = new UserModel(UserData);
  //     const SaveUser = await newuser.save();
  //     // email password
  //     return {
  //       userProfile: SaveUser.toObject(),
  //     };
  //   } catch (error) {
  //     console.log("Error:", error); // Logging error
  //     throw new Error(error);
  //   }
  // }

  // get all cards
  async GetAllUserRepo(): Promise<UserProfille[]> {
    try {
      return await UserModel.find();
    } catch (error) {
      throw error;
    }
  }
  // get card by id
  async findById(id: string): Promise<UserProfille | null> {
    try {
      return await UserModel.findById(id);
    } catch (error) {
      console.log(error);
    }
  }
  // update  card
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

  // delete card
  async deleteUser(id: string): Promise<UserProfille | null> {
    try {
      return await UserModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
