import { companycreateschema } from "../database/repository/@types/company.repo.type";
import CompanyService from "../service/company-servive";
import { Body, Controller, Post, Route, SuccessResponse } from "tsoa";
import { StatusCode } from "../util/consts/status.code";

@Route("v1/company")
export class CompanyController extends Controller {
  @SuccessResponse(StatusCode.Created, "Created")
  @Post(ROUTE_PATHS.COMPANY.CREATE)
  public async Create(@Body() requestBody: companycreateschema): Promise<any> {
    try {
      const company = new CompanyService();
      const result = await company.Create(requestBody);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}
// export default CompanyController;
