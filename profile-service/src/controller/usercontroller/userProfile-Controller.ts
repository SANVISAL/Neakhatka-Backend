import {
  Body,
  Controller,
  //   Get,
  Route,
  Path,
  SuccessResponse,
  //   Put,
  Post,
  // Response,
  //   Delete,
} from "tsoa";
import { UserService } from "../../service/userService/userProfileService";
import { IUserProfille } from "../../models/userprofile/userprofilel-model";
import ROUTE_PATHS from "../../routes/v1/useProfile.Route";
@Route("/v1/users")
export class UserController extends Controller {
  private userservice: UserService;

  constructor(userservice: UserService) {
    super();
    this.userservice = userservice;
  }
  @Post(ROUTE_PATHS.PROFILE.GET_ALL)
  //   @Get("/all-profile")
  public async GetAllUserController(): Promise<IUserProfille[]> {
    return await this.userservice.GetAllProfileervice();
  }
  // GET USER BY ID
  //   @Get("/profile/:id")
  @Post(ROUTE_PATHS.PROFILE.GET_BY_ID)
  @SuccessResponse("200", "Successfully retrieved profile")
  // @Response("404", "Card not found")
  public async GetCardById(@Path() id: string): Promise<any> {
    try {
      const User = await this.userservice.GetByIdService(id);
      if (User) {
        return User;
      } else {
        return { message: "Profile Not Found" };
      }
    } catch (error) {
      console.log(error);
    }
  }

  // update card

  //   @Put("/update/:id")
  @Post(ROUTE_PATHS.PROFILE.UPDATE)
  public async UpdateUserController(
    @Path() id: string,
    @Body() UpdateData: Partial<IUserProfille>
  ): Promise<any> {
    const updateuser = await this.userservice.updateProfileService(
      id,
      UpdateData
    );
    if (updateuser) {
      return updateuser;
    } else {
      this.setStatus(404);
      return { message: "Profile Not Found" };
    }
  }
  // delete USER by id
  //   @Delete("/delete/:id")
  @Post(ROUTE_PATHS.PROFILE.DELETE)
  public async DeleteUserContrioller(@Path() id: string): Promise<any> {
    const deleteuser = await this.userservice.DeleteProfileService(id);
    if (deleteuser) {
      return deleteuser;
    } else {
      return { message: "Profile Not Found" };
    }
  }
}
