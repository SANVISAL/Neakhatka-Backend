import { Card, ICard } from "../model/CardModel";

export class CardRepository {
  // repository for  create new card

  async CreateNewCard(CardData: ICard): Promise<ICard> {
    try {
      const newcard = new Card(CardData);
      const SaveCard = await newcard.save();
      return SaveCard;
    } catch (error) {
      throw new Error(error);
    }
  }

  // get all cards
  async GetAllCardRepo(): Promise<ICard[]> {
    try {
      return await Card.find();
    } catch (error) {
      throw error;
    }
  }
  // get card by id 
  async findById(id: string): Promise<ICard | null> {
    try {
      return await Card.findById(id);
    } catch (error) {
      console.log(error);
    }
  }
  
// update  card 
  async update(
    id: string,
    updateData: Partial<ICard>
  ): Promise<ICard | null> {
    try {
      return await Card.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw error;
    }
  }
// delete card
  async delete(id: string): Promise<ICard | null> {
    try {
      return await Card.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
}
