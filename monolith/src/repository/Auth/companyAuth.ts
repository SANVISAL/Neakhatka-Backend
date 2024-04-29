import {
  CompanyAuth,
  CompanyAuthModel,
} from "../../model/AuthModel/CompanyAuth";

class CompanyAuthRepository {
  // repository for  create new card

  async SignUP(SignUpData: CompanyAuth): Promise<CompanyAuth> {
    try {
      const newSignUp = new CompanyAuthModel(SignUpData);
      const SaveCompany = await newSignUp.save();
      return SaveCompany;
    } catch (error) {
      throw new Error(error);
    }
  }

  // get all Sign Up
  async GetAllSignUp(): Promise<CompanyAuth[]> {
    try {
      return await CompanyAuthModel.find();
    } catch (error) {
      throw error;
    }
  }
  // get card by id
  async FindById(id: string): Promise<CompanyAuth | null> {
    try {
      return await CompanyAuthModel.findById(id);
    } catch (error) {
      console.log(error);
    }
  }

  // update  Sign up
  async UpdateSignUp(
    id: string,
    updateData: Partial<CompanyAuth>
  ): Promise<CompanyAuth | null> {
    try {
      return await CompanyAuthModel.findByIdAndUpdate(id, updateData, {
        new: true,
      });
    } catch (error) {
      throw error;
    }
  }
  // delete Sign Up
  async Delete(id: string): Promise<CompanyAuth | null> {
    try {
      return await CompanyAuthModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}

export default CompanyAuthRepository;
