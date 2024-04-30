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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tsoa_1 = require("tsoa");
const UserProfileService_1 = require("../../service/Profiles/UserProfileService");
let UserController = class UserController extends tsoa_1.Controller {
    constructor(userservice) {
        super();
        this.userservice = userservice;
    }
    GetAllUserController() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userservice.GetAllProfileervice();
        });
    }
    // GET USER BY ID
    GetCardById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const User = yield this.userservice.GetByIdService(id);
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
    UpdateUserController(id, UpdateData) {
        return __awaiter(this, void 0, void 0, function* () {
            const updateuser = yield this.userservice.updateProfileService(id, UpdateData);
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
    DeleteUserContrioller(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteuser = yield this.userservice.DeleteProfileService(id);
            if (deleteuser) {
                return deleteuser;
            }
            else {
                return { message: "USer Not Found" };
            }
        });
    }
};
exports.UserController = UserController;
__decorate([
    (0, tsoa_1.Get)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "GetAllUserController", null);
__decorate([
    (0, tsoa_1.Get)("/:id"),
    (0, tsoa_1.SuccessResponse)("200", "Successfully retrieved User")
    // @Response("404", "Card not found")
    ,
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "GetCardById", null);
__decorate([
    (0, tsoa_1.Put)("/:id"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "UpdateUserController", null);
__decorate([
    (0, tsoa_1.Delete)("/:id"),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "DeleteUserContrioller", null);
exports.UserController = UserController = __decorate([
    (0, tsoa_1.Route)("users"),
    __metadata("design:paramtypes", [UserProfileService_1.UserService])
], UserController);
