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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const favoriteService_1 = __importDefault(require("../../service/Favorite-Card/favoriteService"));
class Favorite_Card {
    constructor() {
        this.favoriteCard = new favoriteService_1.default();
    }
    FavoriteCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, cardId } = req.body; // Assuming userId and cardId are sent in the request body
                yield this.favoriteCard.add_favorite_card(userId, cardId);
                res.status(200).send("Favorite card added successfully");
            }
            catch (error) {
                console.error("Error adding favorite card:", error);
                res.status(500).send("Internal Server Error");
            }
        });
    }
}
exports.default = Favorite_Card;
