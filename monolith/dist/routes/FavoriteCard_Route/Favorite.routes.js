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
const express_1 = __importDefault(require("express"));
const CardModel_1 = require("../../model/CardModel");
const UserProfielModel_1 = require("../../model/ProfileModel/UserProfielModel");
const favoriterouter = express_1.default.Router();
// Backend Route to Add a Card to Favorites
favoriterouter.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, cardId } = req.body;
        console.log(req.body);
        console.log("user", userId);
        console.log("card", cardId);
        // Verify user authentication (not shown here)
        // Ensure userId and cardId are valid (not shown here)
        // Fetch the details of the card using the provided cardId
        const card = yield CardModel_1.Card.findById(cardId);
        console.log(card);
        // If the card is not found, return an error response
        if (!card) {
            return res.status(404).json({ success: false, message: 'Card not found' });
        }
        // Add the card to the user's favorites
        yield UserProfielModel_1.UserModel.findByIdAndUpdate(userId, { $addToSet: { favoriteCards: card } });
        // Return success response
        res.status(200).json({ success: true, message: 'Card added to favorites successfully' });
    }
    catch (error) {
        console.error('Error adding card to favorites:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}));
exports.default = favoriterouter;
// import Favorite_Card from '../../controller/Favorite_Card/favoriteCard';
// const favoriterouter: Router = express.Router();
// const favoriteCardController = new Favorite_Card();
// // Define route for adding a favorite card
// favoriterouter.post('/add-card', async (req, res) => {
//   try {
//     await favoriteCardController.FavoriteCard(req, res);
//   } catch (error) {
//     console.error('Error handling request:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });
// export default favoriterouter;
