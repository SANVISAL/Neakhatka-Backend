import {
  // DeleteCompanyRequest,
  companycreateschema,
  companyupdateschema,
} from "../database/repository/@types/company.repo.type";
import CompanyService from "../service/company-servive";
import ROUTE_PATHS from "../routes/v1/company.route";
import {
  Body,
  Controller,
  Post,
  Get,
  Path,
  Route,
  Put,
  SuccessResponse,
  // Delete,
} from "tsoa";
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
    } catch (error: any) {
      console.log(error);
      throw {
        status: StatusCode.BadRequest,
        message: "Can not create that User!",
        detail: error.message,
      };
      // throw error;
    }
  }

  @SuccessResponse(StatusCode.OK)
  @Get(ROUTE_PATHS.COMPANY.GET_BY_ID)
  public async Get_By_id(@Path() id: string): Promise<any> {
    try {
      const companyservice = new CompanyService();
      const result = await companyservice.Find_By_Id({ id });
      return result;
    } catch (error: any) {
      console.log(error);
      // throw error;
      throw {
        status: StatusCode.NotFound,
        message: "Can not found with that id",
        detail: error.message,
      };
    }
  }

  @SuccessResponse(StatusCode.Found)
  @Put(ROUTE_PATHS.COMPANY.UPDATE)
  public async Update(@Path() id: string, @Body() update: companyupdateschema) {
    try {
      const companyservice = new CompanyService();
      const result = await companyservice.update({ id, update });
      return result;
    } catch (error) {
      throw error;
    }
  }

  // @SuccessResponse(StatusCode.NoContent)
  // @Delete(ROUTE_PATHS.COMPANY.DELETE)
  // public async Delete(@Path() id: string): Promise<void> {
  //   try {
  //     const companyservice = new CompanyService();
  //     const deleterequest: DeleteCompanyRequest = { id };
  //     await companyservice.Delete(deleterequest);
  //   } catch (error: any) {
  //     throw {
  //       status: StatusCode.NoContent,
  //       message: "Can not delete that company ",
  //       detail: error.message,
  //     };
  //   }
  // }
}

// export default CompanyController;
