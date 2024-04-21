import express, { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../../controller/UserController";
import { UserRepository } from "../../repository/UserRepository";
import { UserService } from "../../service/UserSign-Up-Service";

const Userrouter: Router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

Userrouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Hello User");
    try {
      const requestBody = req.body;
      const newUser=await userController.CreateUserController(requestBody); // Call the method on the controller instance
        res.json(newUser);
    } catch (error) {
      console.log(error);
    }
  }
);
// get all user
Userrouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Response = await userController.GetAllUserController();
    res.send(Response);
  } catch (error) {
    console.log(error);
  }
});
// get all email and password
Userrouter.get(
  "/email-password",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const Response = await userController.GetAllEmailPasswordController();
      res.send(Response);
    } catch (error) {
      console.log(error);
    }
  }
);

// GET EMAIL AND PASSWORD  BY ID

Userrouter.get(
  "/email-password/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userController.GetEmailPasswordById(req.params.id);
      res.send(user);
    } catch (error) {
      console.log(error);
    }
  }
);

// UPDATE EMAIL AND PASSWORD

Userrouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ID = req.params.id;
      const UpdateData = req.body;
      const updatedCard = await userController.UpdateEmailPasswordController(
        ID,
        UpdateData
      );

      if (updatedCard) {
        res.status(200).json(updatedCard);
      } else {
        res.status(404).json({ message: "Email or Password Not Found" });
      }
    } catch (error) {}
  }
);

// DELETE EMAIL AND PASSWORD

Userrouter.delete(
  "/email-password/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const ID = req.params.id;
    try {
      const userDelete = await userController.DeleteEmailPasswordContrioller(
        ID
      );
      if (!userDelete) {
        res.status(404).json({ message: "Email and Password Not Found" });
      } else {
        res.status(200).json({ message: "Email and Password deleted" });
      }
    } catch (error) {
      next(error);
    }
  }
);

// update user

Userrouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const UserID = req.params.id;
      const UpdateData = req.body;
      const updatedCard = await userController.UpdateUserController(
        UserID,
        UpdateData
      );

      if (updatedCard) {
        res.status(200).json(updatedCard);
      } else {
        res.status(404).json({ message: "User Not Found" });
      }
    } catch (error) {}
  }
);

// get user by id
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

// delete user

Userrouter.delete(
  "/:id",
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
