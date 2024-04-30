import FavoriteCardService from "../../service/Favorite-Card/favoriteService";
import { Request, Response } from "express";

class Favorite_Card {
  private favoriteCard: FavoriteCardService;

  constructor() {
    this.favoriteCard = new FavoriteCardService();
  }
  async FavoriteCard(req: Request, res: Response): Promise<void> {
    try {
      const { userId, cardId } = req.body; // Assuming userId and cardId are sent in the request body
      await this.favoriteCard.add_favorite_card(userId, cardId);
      res.status(200).send("Favorite card added successfully");
    } catch (error) {
      console.error("Error adding favorite card:", error);
      res.status(500).send("Internal Server Error");
    }
  }
}

export default  Favorite_Card
