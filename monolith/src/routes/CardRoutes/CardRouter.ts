import express, { Router, Request, Response, NextFunction } from "express";
import { CardController } from "../../controller/CardController";
import { CardService } from "../../service/CardService";
import { CardRepository } from "../../repository/CardRepository";

const Cardrouter: Router = express.Router();
const cardRepository = new CardRepository();
const cardService = new CardService(cardRepository);
const cardController = new CardController(cardService);

Cardrouter.post(
  "/",
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("Hello Card");
    try {
      const requestBody = req.body;
      const Card = await cardController.CreateCardController(requestBody);
      res.json(Card);
    } catch (error) {
      next(error);
    }
  }
);
// get all card
Cardrouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Response = await cardController.GetAllCardController();
    res.send(Response);
  } catch (error) {
    console.log(error);
  }
});
// get card by id
Cardrouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const card = await cardController.GetCardById(req.params.id);
      res.send(card);
    } catch (error) {
      console.log(error);
    }
  }
);
// update card
Cardrouter.put(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const CardID = req.params.id;
      const UpdateData = req.body;
      const updatedCard = await cardController.UpdateCardController(
        CardID,
        UpdateData
      );

      if (updatedCard) {
        res.status(200).json(updatedCard);
      } else {
        res.status(404).json({ message: "Card Not Found" });
      }
    } catch (error) {}
  }
);

// delete card

Cardrouter.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const CardID = req.params.id;
    try {
      const cardDelete = await cardController.DeleteCardContrioller(CardID);
      if (!cardDelete) {
        res.status(404).json({ message: "Card Not Found" });
      } else {
        res.status(200).json({ message: "Card deleted" });
      }
    } catch (error) {
      next(error);
    }
  }
);

export { Cardrouter };
