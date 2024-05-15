import {
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
  Delete,
} from "tsoa";
import { StatusCode } from "../util/consts/status.code";
// import { postcreateschema } from "../database/repository/@types/post.repo.type";
// import PostService from "../service/post-service";
// import { ICompanyDocument } from "../database/model/company.repository.model";

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

  @SuccessResponse(StatusCode.OK)
  @Get(ROUTE_PATHS.COMPANY.GET_BY_ID)
  public async Get_By_id(@Path() id: string): Promise<any> {
    try {
      const companyservice = new CompanyService();
      const result = await companyservice.Find_By_Id({ id });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @SuccessResponse(StatusCode.Found)
  @Put(ROUTE_PATHS.COMPANY.UPDATE)
  public async Update(@Path() id: string, @Body() update: companyupdateschema) {
    try {
      const companyservice = new CompanyService();
      const result = await companyservice.update({ id, update });
      return result;
    } catch (error) {}
  }

  @SuccessResponse(StatusCode.NoContent)
  @Delete(ROUTE_PATHS.COMPANY.DELETE)
  public async Delete(@Path() id: string) {
    try {
      const companyservice = new CompanyService();
      const deletecompany = companyservice.Delete({ id });
      return deletecompany;
    } catch (error) {
      throw error;
    }
  }

  // @SuccessResponse(StatusCode.Created)
  // @Post(ROUTE_PATHS.COMPANY.POST)
  // public async CreatePost(@Body() requertBody: postcreateschema) {
  //   try {
  //     const postservice = new PostService();
  //     const result = await postservice.Create(requertBody);
  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}

// export default CompanyController;
