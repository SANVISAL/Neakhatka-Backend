import { UserModel, UserProfille } from "../model/UserProfielModel";
import { EmailPassword, EmailPasswordModel } from "../model/EmailPasswordModel";

export class UserRepository {
  // repository for  create new card

  async CreateNewUser(
    UserData: UserProfille,
    email: string,
    password: string
  ): Promise<{ userProfile: UserProfille; emailPassword: EmailPassword }> {
    try {
      // user profile
      const newuser = new UserModel(UserData);
      const SaveUser = await newuser.save();
      // email password
      const newEmailPassword = new EmailPasswordModel({ email, password });
      const savedEmailPassword = await newEmailPassword.save();
      return {
        userProfile: SaveUser.toObject(),
        emailPassword: savedEmailPassword.toObject(),
      };
    } catch (error) {
      console.log("Error:", error); // Logging error
      throw new Error(error);
    }
  }

  // get all cards
  async GetAllUserRepo(): Promise<UserProfille[]> {
    try {
      return await UserModel.find();
    } catch (error) {
      throw error;
    }
  }
  //  GET ALL EMAIL AND PASSWORD
  async GetAllEmailPassword(): Promise<EmailPassword[]> {
    try {
      const emailPasswords = await EmailPasswordModel.find();
      return emailPasswords;
    } catch (error) {
      throw new Error(error);
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

  //  GET EMAIL AND PASSWOR BY USING ID
  async findemailpasswordbyid(id: string): Promise<EmailPassword | null> {
    try {
      return await EmailPasswordModel.findById(id);
    } catch (error) {
      throw error;
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
  // UPDATE EMAIL AND PASSWORD
  async updateemailpassword(
    id: string,
    updateData: Partial<EmailPassword>
  ): Promise<EmailPassword | null> {
    try {
      return await EmailPasswordModel.findByIdAndUpdate(id, updateData, {
        new: true,
      });
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
  // DELETE EMAIL AND PASSWORD
  async deleteemailpassword(id: string):Promise<EmailPassword| null>{
    try{
      return await EmailPasswordModel.findByIdAndDelete(id);

    }catch(error){
      throw error;
    }


  }
}
