import express, { Router, Request, Response, NextFunction } from "express";
import { Com_Profile_Controller } from "../../controller/Company_Profile/company_profile";
import CompanyProfileService from "../../service/CompanyProfile/CompanyProfileService";
import CompanyProfileRepository from "../../repository/CompanyProfileRepository";

const com_profile_router: Router = express.Router();
const com_profile_Repository = new CompanyProfileRepository();
const com_profile_Service = new CompanyProfileService(com_profile_Repository);
const com_profile_Controller = new Com_Profile_Controller(com_profile_Service);

// get all user profile 
com_profile_router.get("/all-profile", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Response = await com_profile_Controller.GetAllCom_Profile();
    res.send(Response);
  } catch (error) {
    console.log(error);
  }
});
// update user profile
com_profile_router.put(
  "/update-company/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const UserID = req.params.id;
      const UpdateData = req.body;
      const updatedProfile = await com_profile_Controller.Update_Com_Profile(
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
com_profile_router.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await com_profile_Controller.Get_Com_ProfileBy_Id(req.params.id);
      res.send(user);
    } catch (error) {
      console.log(error);
    }
  }
);

// delete user profile 

com_profile_router.delete(
  "/delete-company/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const CardID = req.params.id;
    try {
      const userDelete = await com_profile_Controller.Delete_Com_Profile(CardID);
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

export { com_profile_router };
