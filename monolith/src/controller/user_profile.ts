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
import { UserService } from "../service/UserProfile/UserProfileService";
import { UserModel, UserProfille } from "../model/UserProfielModel";
import { Request, Response, NextFunction } from "express";

@Route("users")
export class UserController extends Controller {
  private userservice: UserService;

  constructor(userservice: UserService) {
    super();
    this.userservice = userservice;
  }

  @Get("/")
  public async GetAllUserController(): Promise<UserProfille[]> {
    return await this.userservice.GetAllProfileervice();
  }
  // GET USER BY ID
  @Get("/:id")
  
  @SuccessResponse("200", "Successfully retrieved User")
  // @Response("404", "Card not found")
  public async GetCardById(@Path() id: string): Promise<any> {
    try {
      const User = await this.userservice.GetByIdService(id);
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
  public async UpdateUserController(
    @Path() id: string,
    @Body() UpdateData: Partial<UserProfille>
  ): Promise<any> {
    const updateuser = await this.userservice.updateProfileService(
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
  public async DeleteUserContrioller(@Path() id: string): Promise<any> {
    const deleteuser = await this.userservice.DeleteProfileService(id);
    if (deleteuser) {
      return deleteuser;
    } else {
      return { message: "USer Not Found" };
    }
  }
}
