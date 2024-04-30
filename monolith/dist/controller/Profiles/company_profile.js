"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.Com_Profile_Controller = void 0;
const tsoa_1 = require("tsoa");
const CompanyProfileService_1 = __importDefault(require("../../service/Profiles/CompanyProfileService"));
let Com_Profile_Controller = class Com_Profile_Controller extends tsoa_1.Controller {
    constructor(com_profile_service) {
        super();
        this.com_profile_service = com_profile_service;
    }
    GetAllCom_Profile() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.com_profile_service.GetAllProfiles();
        });
    }
    // GET USER BY ID
    Get_Com_ProfileBy_Id(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const User = yield this.com_profile_service.GetProfileBy_Id(id);
                if (User) {
                    return User;
                }
                else {
                    return { message: "User Not Found" };
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // update card
    Update_Com_Profile(id, UpdateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateuser = yield this.com_profile_service.UpdateProfileBy_ID(id, UpdateData);
            if (updateuser) {
                return updateuser;
            }
            else {
                this.setStatus(404);
                return { message: "User Not Found" };
            }
        });
    }
    // delete USER by id
    Delete_Com_Profile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteuser = yield this.com_profile_service.DeleteProfile(id);
            if (deleteuser) {
                return deleteuser;
            }
            else {
                return { message: "USer Not Found" };
            }
        });
    }
};
exports.Com_Profile_Controller = Com_Profile_Controller;
__decorate([
    (0, tsoa_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Com_Profile_Controller.prototype, "GetAllCom_Profile", null);
__decorate([
    (0, tsoa_1.Get)("/:id"),
    (0, tsoa_1.SuccessResponse)("200", "Successfully retrieved User")
    // @Response("404", "Card not found")
    ,
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Com_Profile_Controller.prototype, "Get_Com_ProfileBy_Id", null);
__decorate([
    (0, tsoa_1.Put)("/:id"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], Com_Profile_Controller.prototype, "Update_Com_Profile", null);
__decorate([
    (0, tsoa_1.Delete)("/:id"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Com_Profile_Controller.prototype, "Delete_Com_Profile", null);
exports.Com_Profile_Controller = Com_Profile_Controller = __decorate([
    (0, tsoa_1.Route)("users"),
    __metadata("design:paramtypes", [CompanyProfileService_1.default])
], Com_Profile_Controller);
