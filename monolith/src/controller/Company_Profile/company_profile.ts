import {
  Body,
  Controller,
  Post,
  Get,
  Route,
  Path,
  SuccessResponse,
  Put,
  UploadedFile,
  // Response,
  Delete,
} from "tsoa";
import CompanyProfileService from "../../service/CompanyProfile/CompanyProfileService";
import {
  CompanyModel,
  ICompany,
} from "../../model/CompanyModel/CompanyProfile";
import { Request, Response, NextFunction } from "express";

@Route("users")
export class Com_Profile_Controller extends Controller {
  private com_profile_service: CompanyProfileService;

  constructor(com_profile_service: CompanyProfileService) {
    super();
    this.com_profile_service = com_profile_service;
  }
  @Get("/")
  public async GetAllCom_Profile(): Promise<ICompany[]> {
    return await this.com_profile_service.GetAllProfiles();
  }

  // GET USER BY ID

  @Get("/:id")
  @SuccessResponse("200", "Successfully retrieved User")
  // @Response("404", "Card not found")
  public async Get_Com_ProfileBy_Id(@Path() id: string): Promise<any> {
    try {
      const User = await this.com_profile_service.GetProfileBy_Id(id);
      if (User) {
        return User;
      } else {
        return { message: "User Not Found" };
      }
    } catch (error) {
      console.log(error);
    }
  }

  // update card

  @Put("/:id")
  public async Update_Com_Profile(
    @Path() id: string,
    @Body() UpdateData: Partial<ICompany>
  ): Promise<any> {
    const updateuser = await this.com_profile_service.UpdateProfileBy_ID(
      id,
      UpdateData
    );
    if (updateuser) {
      return updateuser;
    } else {
      this.setStatus(404);
      return { message: "User Not Found" };
    }
  }
  // delete USER by id
  @Delete("/:id")
  public async Delete_Com_Profile(@Path() id: string): Promise<any> {
    const deleteuser = await this.com_profile_service.DeleteProfile(id);
    if (deleteuser) {
      return deleteuser;
    } else {
      return { message: "USer Not Found" };
    }
  }
}
