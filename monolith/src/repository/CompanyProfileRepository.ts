import { CompanyModel,ICompany } from "../model/CompanyModel/CompanyProfile";
// import { EmailPassword, EmailPasswordModel } from "../model/EmailPasswordModel";

class CompanyProfileRepository {
  // repository for  create new company profile

  // get all company profile
  async GetAllUserRepo(): Promise<ICompany[]> {
    try {
      return await CompanyModel.find();
    } catch (error) {
      throw error;
    }
  }
  // get card by id
  async findById(id: string): Promise<ICompany | null> {
    try {
      return await CompanyModel.findById(id);
    } catch (error) {
      console.log(error);
    }
  }
  // update  card
  async updateUser(
    id: string,
    updateData: Partial<ICompany>
  ): Promise<ICompany | null> {
    try {
      return await CompanyModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw error;
    }
  }

  // delete card
  async deleteUser(id: string): Promise<ICompany | null> {
    try {
      return await CompanyModel.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}


export default CompanyProfileRepository;