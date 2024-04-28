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
const UserProfielModel_1 = require("../model/UserProfielModel");
const EmailPasswordModel_1 = require("../model/EmailPasswordModel");
class UserRepository {
    // repository for  create new card
    CreateNewUser(UserData, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // user profile
                const newuser = new UserProfielModel_1.UserModel(UserData);
                const SaveUser = yield newuser.save();
                // email password
                const newEmailPassword = new EmailPasswordModel_1.EmailPasswordModel({ email, password });
                const savedEmailPassword = yield newEmailPassword.save();
                return {
                    userProfile: SaveUser.toObject(),
                    emailPassword: savedEmailPassword.toObject(),
                };
            }
            catch (error) {
                console.log("Error:", error); // Logging error
                throw new Error(error);
            }
        });
    }
    // get all cards
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
    //  GET ALL EMAIL AND PASSWORD
    GetAllEmailPassword() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const emailPasswords = yield EmailPasswordModel_1.EmailPasswordModel.find();
                return emailPasswords;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get card by id
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
    //  GET EMAIL AND PASSWOR BY USING ID
    findemailpasswordbyid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield EmailPasswordModel_1.EmailPasswordModel.findById(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // update  card
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
    // UPDATE EMAIL AND PASSWORD
    updateemailpassword(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield EmailPasswordModel_1.EmailPasswordModel.findByIdAndUpdate(id, updateData, {
                    new: true,
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    // delete card
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
    // DELETE EMAIL AND PASSWORD
    deleteemailpassword(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield EmailPasswordModel_1.EmailPasswordModel.findByIdAndDelete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserRepository = UserRepository;
