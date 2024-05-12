import { Controller, Post, Route, Body } from "tsoa";
import ROUTE_PATHS from "../../routes/v1/company.Route";
import { ICompanyDocument } from "../../database/@types/company-interface";
import CompanyService from "../../service/userService/companyProfile-sevice";

@Route("/v1/company")
 export class CompanyController extends Controller {
  @Post(ROUTE_PATHS.COMPANY.SIGN_UP)
  public async Crate(@Body() requestBody: ICompanyDocument): Promise<any> {
    try {
      const companyservice = new CompanyService();
      const result = await companyservice.Create(requestBody);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

// export default CompanyController;
