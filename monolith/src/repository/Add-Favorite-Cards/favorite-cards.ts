import {
  FavoriteCard,
  FavoriteCardModel,
} from "../../model/Add-Favorite -Card/add-favorite-card";
import { Card } from "../../model/CardModel";
import { UserModel } from "../../model/ProfileModel/UserProfielModel";
class FavoriteCardRepo {
  // 1. Add favotite card
  async Add_Favorite_Card(userid: string, cardid: string): Promise<void> {
    try {
      const userExists = await UserModel.exists({ _id: userid });
      const cardExists = await Card.exists({ _id: cardid });

      if (!userExists || !cardExists) {
        throw new Error(" User and Card not Found");
      }
      const favoritecard = new FavoriteCardModel({
        user: userid,
        card: cardid,
      });
      await favoritecard.save();
      console.log(`Card added to favorites for user ${userid}`);
    } catch (error) {
      throw error;
    }

  }
}

export default FavoriteCardRepo;
