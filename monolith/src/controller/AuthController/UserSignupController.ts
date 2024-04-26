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
import AuthService from "../../service/AuthService/UserSignUpService";
import { Auth, AuthModel } from "../../model/Auth";

@Route("Cards")
class AuthController extends Controller {
  private signupservice: AuthService;

  constructor(cardservice: AuthService) {
    super();
    this.signupservice = cardservice;
  }
  @Post("/")
  public async CreateSignUpController(@Body() requestBody: any): Promise<any> {
    try {
      const newCard = await this.signupservice.CreateSignupService(requestBody);
      return newCard;
    } catch (error) {
      throw new Error(error);
    }
  }
  @Get("/")
  public async GetAllSignUpController(): Promise<Auth[]> {
    return await this.signupservice.GetAllSignUpService();
  }

  @Get("/:id")
  @SuccessResponse("200", "Successfully retrieved Sign up")
  @Response("404", "Data not found")
  public async GetSignUpById(@Path() id: string): Promise<any> {
    try {
      const card = await this.signupservice.GetByIdService(id);
      if (card) {
        return card;
      } else {
        return { message: "Sign up Not Found" };
      }
    } catch (error) {
      console.log(error);
    }
  }

  // update card
  @Put("/:id")
  public async UpdateSignUpController(
    @Path() id: string,
    @Body() UpdateData: Partial<Auth>
  ): Promise<any> {
    const updatecard = await this.signupservice.UpdateSignUpService(
      id,
      UpdateData
    );
    if (updatecard) {
      return updatecard;
    } else {
      this.setStatus(404);
      return { message: "Card Not Found" };
    }
  }

  // delete card by id
  @Delete("/:id")
  public async DeleteSignUpContrioller(@Path() id: string): Promise<any> {
    const deletecard = await this.signupservice.DeleteSignupService(id);
    if (deletecard) {
      return deletecard;
    } else {
      return { message: "Card Not Found" };
    }
  }
}

export default AuthController;
