import {
    Body,
    Controller,
    Post,
    Get,
    Route,
    Path,
    SuccessResponse,
    Response,
    Put,
    UploadedFile,
    Delete,
  } from "tsoa";
  import  CompanyAuthService from "../../service/AuthService/CompanyAuthService";
  import { CompanyAuth,CompanyAuthModel } from "../../model/CompanyModel/CompanyAuth";
  
  @Route("Cards")
class CompanyAuthController extends Controller {
    private companyauthservice: CompanyAuthService;
  
    constructor(companyservice: CompanyAuthService) {
      super();
      this.companyauthservice = companyservice;
    }
    @Post("/")
    public async SignUpController(@Body() requestBody: any): Promise<any> {
      try {
        const  NewCompany = await this.companyauthservice.SignupService(requestBody);
        return NewCompany;
      } catch (error) {
        throw new Error(error);
      }
    }

    // @Get("/")
    // public async GetAllSignUpController(): Promise<CompanyAuth[]> {
    //   return await this.companyauthservice.GetAllSignUpService();
    // }
  
    // @Get("/:id")
    // @SuccessResponse("200", "Successfully retrieved Sign up")
    // @Response("404", "Data not found")
    // public async GetSignUpById(@Path() id: string): Promise<any> {
    //   try {
    //     const company = await this.companyauthservice.GetByIdService(id);
    //     if (company) {
    //       return company;
    //     } else {
    //       return { message: "Sign up Not Found" };
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  
    // update card
    // @Put("/:id")
    // public async UpdateSignUpController(
    //   @Path() id: string,
    //   @Body() UpdateData: Partial<CompanyAuth>
    // ): Promise<any> {
    //   const updatecompanysignup = await this.companyauthservice.UpdateSignUpService(
    //     id,
    //     UpdateData
    //   );
    //   if (updatecompanysignup) {
    //     return updatecompanysignup;
    //   } else {
    //     this.setStatus(404);
    //     return { message: "company Not Found" };
    //   }
    // }
  
    // delete card by id
    @Delete("/:id")
    public async DeleteSignUp(@Path() id: string): Promise<any> {
      const deletecompany = await this.companyauthservice.DeleteSignupService(id);
      if (deletecompany) {
        return deletecompany;
      } else {
        return { message: "company Not Found" };
      }
    }
  }
  
  export default CompanyAuthController