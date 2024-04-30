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
class CompanyProfileService {
    constructor(profileRepository) {
        this.com_profile_Repository = profileRepository;
    }
    //  get all commpany profile
    GetAllProfiles() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.com_profile_Repository.GetAllUserRepo();
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetProfileBy_Id(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.com_profile_Repository.findById(id);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // update card
    UpdateProfileBy_ID(id, UpdateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.com_profile_Repository.updateUser(id, UpdateData);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // delete card
    DeleteProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.com_profile_Repository.deleteUser(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = CompanyProfileService;
