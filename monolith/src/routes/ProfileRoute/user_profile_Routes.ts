import express, { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../../controller/user_profile";
import { UserRepository } from "../../repository/UserRepository";
import { UserService } from "../../service/UserProfile/UserProfileService";

const Userrouter: Router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// get all user profile 
Userrouter.get("/all-profile", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Response = await userController.GetAllUserController();
    res.send(Response);
  } catch (error) {
    console.log(error);
  }
});
// update user profile
Userrouter.put(
  "/update-profile/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const UserID = req.params.id;
      const UpdateData = req.body;
      const updatedProfile = await userController.UpdateUserController(
        UserID,
        UpdateData
      );

      if (updatedProfile) {
        res.status(200).json(updatedProfile);
      } else {
        res.status(404).json({ message: "User Not Found" });
      }
    } catch (error) {}
  }
);

// get user profile by id
Userrouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userController.GetCardById(req.params.id);
      res.send(user);
    } catch (error) {
      console.log(error);
    }
  }
);

// delete user profile 

Userrouter.delete(
  "/delete-profile/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const CardID = req.params.id;
    try {
      const userDelete = await userController.DeleteUserContrioller(CardID);
      if (!userDelete) {
        res.status(404).json({ message: "User Not Found" });
      } else {
        res.status(200).json({ message: "User deleted" });
      }
    } catch (error) {
      next(error);
    }
  }
);

export { Userrouter };
