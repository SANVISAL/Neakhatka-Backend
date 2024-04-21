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
exports.CardRepository = void 0;
const CardModel_1 = require("../model/CardModel");
class CardRepository {
    // repository for  create new card
    CreateNewCard(CardData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newcard = new CardModel_1.Card(CardData);
                const SaveCard = yield newcard.save();
                return SaveCard;
            }
            catch (error) {
                throw new Error(error);
            }
        });
    }
    // get all cards
    GetAllCardRepo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield CardModel_1.Card.find();
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
                return yield CardModel_1.Card.findById(id);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    // update  card 
    update(id, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield CardModel_1.Card.findByIdAndUpdate(id, updateData, { new: true });
            }
            catch (error) {
                throw error;
            }
        });
    }
    // delete card
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield CardModel_1.Card.findByIdAndDelete(id);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.CardRepository = CardRepository;
