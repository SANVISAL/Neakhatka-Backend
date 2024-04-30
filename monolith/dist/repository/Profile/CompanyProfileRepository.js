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
const CompanyProfile_1 = require("../../model/ProfileModel/CompanyProfile");
// import { EmailPassword, EmailPasswordModel } from "../model/EmailPasswordModel";
class CompanyProfileRepository {
    // repository for  create new company profile
    // get all company profile
    GetAllUserRepo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield CompanyProfile_1.CompanyModel.find();
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
                return yield CompanyProfile_1.CompanyModel.findById(id);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // update  card
    updateUser(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield CompanyProfile_1.CompanyModel.findByIdAndUpdate(id, updateData, {
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
                return yield CompanyProfile_1.CompanyModel.findByIdAndDelete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = CompanyProfileRepository;
