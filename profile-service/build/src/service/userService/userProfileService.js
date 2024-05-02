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
exports.UserService = void 0;
class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    GetAllProfileervice() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.GetAllUserRepo();
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetByIdService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.findById(id);
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
    // update card
    updateProfileService(id, UpdateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.updateUser(id, UpdateData);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // delete card
    DeleteProfileService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.userRepository.deleteUser(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=userProfileService.js.map