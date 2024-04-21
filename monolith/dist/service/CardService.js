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
exports.CardService = void 0;
class CardService {
    constructor(cardRepository) {
        this.cardRepository = cardRepository;
    }
    CreateCardService(CardData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.cardRepository.CreateNewCard(CardData);
                return {
                    status: "Succecss",
                    message: "Card Create Successfully",
                };
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // get all cards
    GetAllCardService() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.cardRepository.GetAllCardRepo();
            }
            catch (error) {
                throw error;
            }
        });
    }
    GetByIdService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.cardRepository.findById(id);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // update card
    updateCardService(id, UpdateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.cardRepository.update(id, UpdateData);
            }
            catch (error) {
                throw error;
            }
        });
    }
    // delete card
    DeleteCardService(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.cardRepository.delete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.CardService = CardService;
