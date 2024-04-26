import { Auth, AuthModel } from "../../model/Auth";

class AuthRepository {
  // repository for  create new card

  async CreateSignUP(SignUpData: Auth): Promise<Auth> {
    try {
      const newSignUP = new AuthModel(SignUpData);
      const SaveUser = await newSignUP.save();
      return SaveUser;
    } catch (error) {
      throw new Error(error);
    }
  }

  // get all Sign Up
  async GetAllSignUp(): Promise<Auth[]> {
    try {
      return await AuthModel.find();
    } catch (error) {
      throw error;
    }
  }
  // get card by id
  async findById(id: string): Promise<Auth | null> {
    try {
      return await AuthModel.findById(id);
    } catch (error) {
      console.log(error);
    }
  }

  // update  Sign up
  async updateSignUp(
    id: string,
    updateData: Partial<Auth>
  ): Promise<Auth | null> {
    try {
      return await AuthModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw error;
    }
  }
  // delete Sign Up
  async delete(id: string): Promise<Auth | null> {
    try {
      return await AuthModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default AuthRepository;
