"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.com_profile_router = void 0;
const express_1 = __importDefault(require("express"));
const company_profile_1 = require("../../controller/Profiles/company_profile");
const CompanyProfileService_1 = __importDefault(require("../../service/Profiles/CompanyProfileService"));
const CompanyProfileRepository_1 = __importDefault(require("../../repository/Profile/CompanyProfileRepository"));
const com_profile_router = express_1.default.Router();
exports.com_profile_router = com_profile_router;
const com_profile_Repository = new CompanyProfileRepository_1.default();
const com_profile_Service = new CompanyProfileService_1.default(com_profile_Repository);
const com_profile_Controller = new company_profile_1.Com_Profile_Controller(com_profile_Service);
// get all user profile
com_profile_router.get("/all-profile", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Response = yield com_profile_Controller.GetAllCom_Profile();
        res.send(Response);
    }
    catch (error) {
        console.log(error);
    }
}));
// update user profile
com_profile_router.put("/update-company/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserID = req.params.id;
        const UpdateData = req.body;
        const updatedProfile = yield com_profile_Controller.Update_Com_Profile(UserID, UpdateData);
        if (updatedProfile) {
            res.status(200).json(updatedProfile);
        }
        else {
            res.status(404).json({ message: "User Not Found" });
        }
    }
    catch (error) { }
}));
// get user profile by id
com_profile_router.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield com_profile_Controller.Get_Com_ProfileBy_Id(req.params.id);
        res.send(user);
    }
    catch (error) {
        console.log(error);
    }
}));
// delete user profile
com_profile_router.delete("/delete-company/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const CardID = req.params.id;
    try {
        const userDelete = yield com_profile_Controller.Delete_Com_Profile(CardID);
        if (!userDelete) {
            res.status(404).json({ message: "User Not Found" });
        }
        else {
            res.status(200).json({ message: "User deleted" });
        }
    }
    catch (error) {
        next(error);
    }
}));
