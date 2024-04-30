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
exports.Userrouter = void 0;
const express_1 = __importDefault(require("express"));
const user_profile_1 = require("../../controller/Profiles/user_profile");
const UserProfileRepository_1 = require("../../repository/Profile/UserProfileRepository");
const UserProfileService_1 = require("../../service/Profiles/UserProfileService");
const Userrouter = express_1.default.Router();
exports.Userrouter = Userrouter;
const userRepository = new UserProfileRepository_1.UserRepository();
const userService = new UserProfileService_1.UserService(userRepository);
const userController = new user_profile_1.UserController(userService);
// get all user profile
Userrouter.get("/all-profile", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Response = yield userController.GetAllUserController();
        res.send(Response);
    }
    catch (error) {
        console.log(error);
    }
}));
// update user profile
Userrouter.put("/update-profile/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserID = req.params.id;
        const UpdateData = req.body;
        const updatedProfile = yield userController.UpdateUserController(UserID, UpdateData);
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
Userrouter.get("/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userController.GetCardById(req.params.id);
        res.send(user);
    }
    catch (error) {
        console.log(error);
    }
}));
// delete user profile
Userrouter.delete("/delete-profile/:id", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const CardID = req.params.id;
    try {
        const userDelete = yield userController.DeleteUserContrioller(CardID);
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
