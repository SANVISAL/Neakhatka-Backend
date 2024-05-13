import { CompanyModel } from "../model/company.repository.model";
import {
  companycreateschema,
  companyupdateschema,
} from "./@types/company.repo.type";

class CompanyRepo {
  async Create(companydetail: companycreateschema) {
    try {
      const existedemail = await this.Find_Email({
        contactEmail: companydetail.contactEmail,
      });
      if (existedemail) {
        console.log("this error have been use!");
      }
      const company = await new CompanyModel(companydetail);
      const result = await company.save();
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async Find_Email({ contactEmail }: { contactEmail: string }) {
    try {
      const existed = await CompanyModel.findOne({
        contactEmail: contactEmail,
      });
      return existed;
    } catch (error) {
      console.log(error);
    }
  }
  async Find_By_id({ id }: { id: string }) {
    try {
      const existed = await CompanyModel.findById(id);
      return existed;
    } catch (error) {
      console.log(error);
    }
  }
  async Update({ id, update }: { id: string; update: companyupdateschema }) {
    try {
      const existed = await this.Find_By_id({ id });
      if (!existed) {
        console.log("Unable to update this Profile");
      }
      const companyupdate = await CompanyModel.findByIdAndUpdate(id, update, {
        new: true,
      });
      return companyupdate;
    } catch (error) {
      console.log(error);
    }
  }
  async Delete({ id }: { id: string }) {
    try {
      const existed = await this.Find_By_id({ id });
      if (!existed) {
        console.log("Unable To Delete!");
      }
      const deleteprofile = await CompanyModel.findByIdAndDelete(id);
      return deleteprofile;
    } catch (error) {
      console.log(error);
    }
  }
}
export default CompanyRepo;