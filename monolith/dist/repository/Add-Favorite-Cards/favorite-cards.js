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
const add_favorite_card_1 = require("../../model/Add-Favorite -Card/add-favorite-card");
const CardModel_1 = require("../../model/CardModel");
const UserProfielModel_1 = require("../../model/ProfileModel/UserProfielModel");
class FavoriteCardRepo {
    // 1. Add favotite card
    Add_Favorite_Card(userid, cardid) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userExists = yield UserProfielModel_1.UserModel.exists({ _id: userid });
                const cardExists = yield CardModel_1.Card.exists({ _id: cardid });
                if (!userExists || !cardExists) {
                    throw new Error(" User and Card not Found");
                }
                const favoritecard = new add_favorite_card_1.FavoriteCardModel({
                    user: userid,
                    card: cardid,
                });
                yield favoritecard.save();
                console.log(`Card added to favorites for user ${userid}`);
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = FavoriteCardRepo;
