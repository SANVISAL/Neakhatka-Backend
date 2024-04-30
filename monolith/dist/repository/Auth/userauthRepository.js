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
const UserAuth_1 = require("../../model/AuthModel/UserAuth");
class AuthRepository {
    // repository for  create new card
    CreateSignUP(SignUpData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newSignUP = new UserAuth_1.AuthModel(SignUpData);
                const SaveUser = yield newSignUP.save();
                return SaveUser;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get all Sign Up
    GetAllSignUp() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserAuth_1.AuthModel.find();
            }
            catch (error) {
                throw error;
            }
        });
    }
    // get card by id
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserAuth_1.AuthModel.findById(id);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // update  Sign up
    updateSignUp(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserAuth_1.AuthModel.findByIdAndUpdate(id, updateData, { new: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    // delete Sign Up
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield UserAuth_1.AuthModel.findByIdAndDelete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = AuthRepository;
