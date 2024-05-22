import APIError from "../../error/api-error";
import DuplitcateError from "../../error/duplicate-error";
import { CompanyModel } from "../model/company.repository.model";
import {
  // DeleteCompanyRequest,
  companycreateschema,
  companyupdateschema,
} from "./@types/company.repo.type";
import { StatusCode } from "../../util/consts/status.code";

class CompanyRepo {
  async Create(companydetail: companycreateschema) {
    try {
      const existedemail = await this.Find_Email({
        contactEmail: companydetail.contactEmail,
      });
      if (existedemail) {
        throw new DuplitcateError("this error have been use!");
      }
      const company = await new CompanyModel(companydetail);
      const result = await company.save();
      return result;
    } catch (error) {
      console.log("error", error);
      if (error instanceof DuplitcateError) {
        throw error;
      }
      throw new APIError("Unable to Create to Database");
    }
  }

  async Find_Email({ contactEmail }: { contactEmail: string }) {
    try {
      const existed = await CompanyModel.findOne({
        contactEmail: contactEmail,
      });
      return existed;
    } catch (error) {
      throw new APIError("Unable to Find User in Database ");
    }
  }

  async Find_By_id({ id }: { id: string }) {
    try {
      const existed = await CompanyModel.findById(id);
      return existed;
    } catch (error) {
      // console.log(error);
      throw new APIError("Unable To Find in Database");
    }
  }

  async Update({ id, update }: { id: string; update: companyupdateschema }) {
    try {
      const existed = await this.Find_By_id({ id });
      if (!existed) {
        throw new APIError("User does not exist", StatusCode.NotFound);
        // console.log("Unable to update this Profile");
      }
      const companyupdate = (await CompanyModel.findByIdAndUpdate(id, update, {
        new: true,
      })) as companyupdateschema;
      return companyupdate;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }
      throw new APIError("Unble to Update User in Database");
    }
  }

  async Delete({ id }:{id:string}): Promise<void> {
    try {
      const existed = await this.Find_By_id({ id });
      if (!existed) {
        throw new APIError("Unable to find in database", StatusCode.NoContent);
      }
      const deleteprofile = await CompanyModel.findByIdAndDelete(id);
      if (!deleteprofile) {
        throw new Error("Company not found");
      }
    } catch (error) {
      throw error;
    }
  }
}
export default CompanyRepo;
