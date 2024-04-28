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
exports.Cardrouter = void 0;
const express_1 = __importDefault(require("express"));
const CardController_1 = require("../../controller/CardController");
const CardService_1 = require("../../service/CardService");
const CardRepository_1 = require("../../repository/CardRepository");
const Cardrouter = express_1.default.Router();
exports.Cardrouter = Cardrouter;
const cardRepository = new CardRepository_1.CardRepository();
const cardService = new CardService_1.CardService(cardRepository);
const cardController = new CardController_1.CardController(cardService);
Cardrouter.post("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Hello Card");
    try {
        const requestBody = req.body;
        const Card = yield cardController.CreateCardController(requestBody);
        res.json(Card);
    }
    catch (error) {
        next(error);
    }
})
// );
// // get all card
// Cardrouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const Response = await cardController.GetAllCardController();
//     res.send(Response);
//   } catch (error) {
//     console.log(error);
//   }
// });
// // get card by id
// Cardrouter.get(
//   "/:id",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const card = await cardController.GetCardById(req.params.id);
//       res.send(card);
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );
// // update card
// Cardrouter.put(
//   "/:id",
//   async (req: Request, res: Response, next: NextFunction) => {
//     try {
//       const CardID = req.params.id;
//       const UpdateData = req.body;
//       const updatedCard = await cardController.UpdateCardController(
//         CardID,
//         UpdateData
//       );
//       if (updatedCard) {
//         res.status(200).json(updatedCard);
//       } else {
//         res.status(404).json({ message: "Card Not Found" });
//       }
//     } catch (error) {}
//   }
// );
// // delete card
// Cardrouter.delete(
//   "/:id",
//   async (req: Request, res: Response, next: NextFunction) => {
//     const CardID = req.params.id;
//     try {
//       const cardDelete = await cardController.DeleteCardContrioller(CardID);
//       if (!cardDelete) {
//         res.status(404).json({ message: "Card Not Found" });
//       } else {
//         res.status(200).json({ message: "Card deleted" });
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
);
