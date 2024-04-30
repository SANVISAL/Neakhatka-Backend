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
const CompanyAuth_1 = require("../../model/AuthModel/CompanyAuth");
class CompanyAuthRepository {
    // repository for  create new card
    SignUP(SignUpData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newSignUp = new CompanyAuth_1.CompanyAuthModel(SignUpData);
                const SaveCompany = yield newSignUp.save();
                return SaveCompany;
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
                return yield CompanyAuth_1.CompanyAuthModel.find();
            }
            catch (error) {
                throw error;
            }
        });
    }
    // get card by id
    FindById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield CompanyAuth_1.CompanyAuthModel.findById(id);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // update  Sign up
    UpdateSignUp(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield CompanyAuth_1.CompanyAuthModel.findByIdAndUpdate(id, updateData, {
                    new: true,
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
    // delete Sign Up
    Delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield CompanyAuth_1.CompanyAuthModel.findByIdAndDelete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = CompanyAuthRepository;
