import { ICompanyDocument } from "../../@types/company-interface";
import { CompanyProfile } from "../../models/userprofile/companyprofile-model";
import { companyUpdateRepo } from "../@types/company.repository.type";

class CreateCompanyrepo {
  // To do List
  // 1.crate company profile
  // 2.find email contact email
  // 3.update 
  // 4.find company by id
  ////////////////////////////
  // step 1
  async Create(companydetail: ICompanyDocument) {
    try {
      const existEmail = await this.FindCompanyEmail({
        email: companydetail.contactEmail,
      });
      if (existEmail) {
        console.log("This email have been use before!");
      }
      const company = new CompanyProfile(companydetail);
      const resulitcompany = company.save();
      return resulitcompany;
    } catch (error) {
      console.log(error);
    }
  }
  //  step 2
  async FindCompanyEmail(email: { email: string }) {
    try {
      const existedEmail = await CompanyProfile.findOne({ email: email });
      return existedEmail;
    } catch (error) {
      console.log(error);
    }
  }
  // step 3
  async Update({ id, update }: { id: string; update: companyUpdateRepo }) {
    try {
      const existuser = await this.FindCompanyByID({ id });
      if (!existuser) {
        console.log("User not found");
      }
      const companyUpdate = await CompanyProfile.findByIdAndUpdate(id, update, {
        new: true,
      });
      return companyUpdate;
    } catch (error) {
      console.log(error);
    }
  }
  // step 4 
  async FindCompanyByID({ id }: { id: string }) {
    try {
      const user = await CompanyProfile.findById({ id });
      return user;
    } catch (error) {
      console.log(error);
    }
  }
}

export default CreateCompanyrepo;
