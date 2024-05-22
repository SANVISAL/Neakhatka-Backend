// import { ICompanyDocument } from "../database/model/company.repository.model";
import {
  // DeleteCompanyRequest,
  companycreateschema,
  companyupdateschema,
} from "../database/repository/@types/company.repo.type";
import CompanyRepo from "../database/repository/company.repository";

class CompanyService {
  private companyrepo: CompanyRepo;
  constructor() {
    this.companyrepo = new CompanyRepo();
  }

  async Create(companydetail: companycreateschema) {
    try {
      const company = await this.companyrepo.Create(companydetail);
      return company;
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }

  async Find_By_Id({ id }: { id: string }) {
    try {
      return await this.companyrepo.Find_By_id({ id });
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }

  async Delete({id}:{id:string}): Promise<void> {
    try {
      await this.companyrepo.Delete({id});
    } catch (error: any) {
      console.log("error on service layer",error);
      throw error;
    }
  }

  async update({ id, update }: { id: string; update: companyupdateschema }) {
    try {
      return await this.companyrepo.Update({ id, update });
    } catch (error) {
      // console.log(error);
      throw error;
    }
  }
}
export default CompanyService;
