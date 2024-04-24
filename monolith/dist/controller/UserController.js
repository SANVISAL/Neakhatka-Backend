// import {
//   Body,
//   Controller,
//   Post,
//   Get,
//   Route,
//   Path,
//   SuccessResponse,
//   Put,
//   UploadedFile,
//   // Response,
//   Delete,
// } from "tsoa";
// import { UserService } from "../service/UserSign-Up-Service";
// import { UserModel, UserProfille } from "../model/UserProfielModel";
// import { Request, Response, NextFunction } from "express";
// import { EmailPassword } from "../model/EmailPasswordModel";
// @Route("users")
// export class UserController extends Controller {
//   private userservice: UserService;
//   constructor(userservice: UserService) {
//     super();
//     this.userservice = userservice;
//   }@Post("/")
//   public async CreateUserController(
//     @Body() requestBody: any
//   ): Promise<any> {
//     try {
//       console.log("Request Body:", requestBody); // Logging request body
//       const {  userProfileData, email, password } = requestBody;
//       const newUser = await this.userservice.CreateUserService(
//          userProfileData,
//         email,
//         password
//       );
//       return newUser;
//     } catch (error) {
//       throw new Error(error);
//     }
//   }
//   // GET ALL USER
//   @Get("/")
//   public async GetAllUserController(): Promise<UserProfille[]> {
//     return await this.userservice.GetAllUserService();
//   }
//   // GET ALL EMAIL PASSWORD
//   @Get("/")
//   public async GetAllEmailPasswordController(): Promise<EmailPassword[]> {
//     return await this.userservice.GetAllEmailPasswordService();
//   }
//   // GET USER BY ID
//   @Get("/:id")
//   @SuccessResponse("200", "Successfully retrieved User")
//   // @Response("404", "Card not found")
//   public async GetCardById(@Path() id: string): Promise<any> {
//     try {
//       const User = await this.userservice.GetByIdService(id);
//       if (User) {
//         return User;
//       } else {
//         return { message: "User Not Found" };
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   // GET EMAIL AND PASSWORD BY USEING ID
//   @Get("/:id")
//   @SuccessResponse("200", "Successfully retrieved Email and Password")
//   // @Response("404", "Card not found")
//   public async GetEmailPasswordById(@Path() id: string): Promise<any> {
//     try {
//       const User = await this.userservice.GetemailpasswordByIdservice(id);
//       if (User) {
//         return User;
//       } else {
//         return { message: "Email and Password Not Found" };
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   // update card
//   @Put("/:id")
//   public async UpdateUserController(
//     @Path() id: string,
//     @Body() UpdateData: Partial<UserProfille>
//   ): Promise<any> {
//     const updateuser = await this.userservice.updateUserService(id, UpdateData);
//     if (updateuser) {
//       return updateuser;
//     } else {
//       this.setStatus(404);
//       return { message: "User Not Found" };
//     }
//   }
//   // UPDATE EMAIL AND PASSWORD
//   @Put("/:id")
//   public async UpdateEmailPasswordController(
//     @Path() id: string,
//     @Body() updateData: Partial<EmailPassword>
//   ): Promise<any> {
//     const updateuser = await this.userservice.updateemailpassword(
//       id,
//       updateData
//     );
//     if (updateuser) {
//       return updateuser;
//     } else {
//       this.setStatus(404);
//       return { message: "Email or Password  Not Found" };
//     }
//   }
//   // delete USER by id
//   @Delete("/:id")
//   public async DeleteUserContrioller(@Path() id: string): Promise<any> {
//     const deleteuser = await this.userservice.DeleteUserService(id);
//     if (deleteuser) {
//       return deleteuser;
//     } else {
//       return { message: "USer Not Found" };
//     }
//   }
//   //  DELETE EMAIL AND PASSWORD
//   @Delete("/:id")
//   public async DeleteEmailPasswordContrioller(
//     @Path() id: string
//   ): Promise<any> {
//     const deleteuser = await this.userservice.Deleteemailpassword(id);
//     if (deleteuser) {
//       return deleteuser;
//     } else {
//       return { message: "Email and Password Not Found" };
//     }
//   }
// }
