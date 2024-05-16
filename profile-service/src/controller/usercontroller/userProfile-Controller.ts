import {
  Body,
  Controller,
  // Get,
  Route,
  // Path,
  // SuccessResponse,
  Post,
} from "tsoa";
import { UserService } from "../../service/userService/userProfileService";
import { IUserDocument } from "../../database/@types/user.interface";
import ROUTE_PATHS from "../../routes/v1/useProfile.Route";
// import { StatusCode } from "../../utils/consts/status.code";

@Route("/v1/users")
export class UserController extends Controller {
  @Post(ROUTE_PATHS.PROFILE.CREATE)
  public async CreateUser(@Body() requestBody: IUserDocument): Promise<any> {
    console.log("Recived data", requestBody);
    try {
      const userService = new UserService();

      const userProfile = await userService.createuser(requestBody);

      return userProfile;
    } catch (error) {
      console.log(error);
    }
  }

  // @Get(ROUTE_PATHS.PROFILE.GET_ALL)
  // //   @Get("/all-profile")
  // public async GetAllUserController(): Promise<IUserDocument[]> {
  //   return await userservice.GetAllProfileervice();
  // }

  // @Post(ROUTE_PATHS.PROFILE.GET_BY_ID)
  // @SuccessResponse(StatusCode.OK, "Successfully retrieved profile")
  // // @Response("404", "Card not found")
  // public async GetCardById(@Path() id: string): Promise<any> {
  //   try {
  //     const User = await this.userservice.GetByIdService({ id });
  //     if (User) {
  //       return User;
  //     } else {
  //       return { message: "Profile Not Found" };
  //     }
  //   } catch (error) {
  //     throw error
  //     // console.log(error);
  //   }
  // }

  // // update card
  // @SuccessResponse(StatusCode.OK, "Successfully Update profile")
  // @Post(ROUTE_PATHS.PROFILE.UPDATE)
  // public async updateUserController(
  //   @Path() id: string,
  //   @Body() updateData: Partial<IUserDocument>
  // ): Promise<any> {
  //   try {
  //     const updateuser = await this.userservice.updateProfileService({
  //       id,
  //       updateData,
  //     });
  //     if (!updateuser) {
  //       this.setStatus(404); // Set HTTP status code to 404
  //       return { message: "Profile Not Found" };
  //     }
  //     return updateuser;
  //   } catch (error: any) {
  //     this.setStatus(500); // Set HTTP status code to 500 for server errors
  //     return { message: error.message || "Internal Server Error" };
  //   }
  // }
  // // delete USER by id
  // @SuccessResponse(StatusCode.OK, "Successfully Delete  profile")
  // @Post(ROUTE_PATHS.PROFILE.DELETE)
  // public async DeleteUserContrioller(@Path() id: string): Promise<any> {
  //   const deleteuser = await this.userservice.DeleteProfileService({ id });
  //   if (deleteuser) {
  //     return deleteuser;
  //   } else {
  //     return { message: "Profile Not Found" };
  //   }
  // }
}
