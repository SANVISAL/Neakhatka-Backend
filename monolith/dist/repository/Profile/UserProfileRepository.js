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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const UserProfielModel_1 = require("../../model/ProfileModel/UserProfielModel");
// import { EmailPassword, EmailPasswordModel } from "../model/EmailPasswordModel";
class UserRepository {
    // get all user profile
    GetAllUserRepo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserProfielModel_1.UserModel.find();
            }
            catch (error) {
                throw error;
            }
        });
    }
    // get profile by id
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserProfielModel_1.UserModel.findById(id);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // update profile
    updateUser(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserProfielModel_1.UserModel.findByIdAndUpdate(id, updateData, { new: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    // delete profile
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserProfielModel_1.UserModel.findByIdAndDelete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserRepository = UserRepository;
