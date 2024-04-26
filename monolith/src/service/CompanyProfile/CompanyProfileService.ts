import {
  CompanyModel,
  ICompany,
} from "../../model/CompanyModel/CompanyProfile";
import CompanyProfileRepository from "../../repository/CompanyProfileRepository";
import CompanyAuthService from "../AuthService/CompanyAuthService";

class CompanyProfileService {
  private com_profile_Repository: CompanyProfileRepository;
  constructor(profileRepository: CompanyProfileRepository) {
    this.com_profile_Repository = profileRepository;
  }
  //  get all commpany profile
  async GetAllProfiles(): Promise<ICompany[]> {
    try {
      return await this.com_profile_Repository.GetAllUserRepo();
    } catch (error) {
      throw error;
    }
  }

  async GetProfileBy_Id(id: string): Promise<ICompany | null> {
    try {
      return await this.com_profile_Repository.findById(id);
    } catch (error) {
      console.log(error);
    }
  }

  // update card
  async UpdateProfileBy_ID(
    id: string,
    UpdateData: Partial<ICompany>
  ): Promise<ICompany | null> {
    try {
      return await this.com_profile_Repository.updateUser(id, UpdateData);
    } catch (error) {
      throw error;
    }
  }

  // delete card
  async DeleteProfile(id: string): Promise<ICompany | null> {
    try {
      return await this.com_profile_Repository.deleteUser(id);
    } catch (error) {
      throw error;
    }
  }
}
export default CompanyProfileService;
