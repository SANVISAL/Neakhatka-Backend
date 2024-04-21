import { threadId } from "worker_threads";
import { Card, ICard } from "../model/CardModel";
import { CardRepository } from "../repository/CardRepository";

export class CardService {
  private cardRepository: CardRepository;
  constructor(cardRepository: CardRepository) {
    this.cardRepository = cardRepository;
  }

  async CreateCardService(CardData: ICard): Promise<any> {
    try {
      await this.cardRepository.CreateNewCard(CardData);
      return {
        status: "Succecss",
        message: "Card Create Successfully",
      };
    } catch (error) {
      console.log(error);
    }
  }
  // get all cards
  async GetAllCardService(): Promise<ICard[]> {
    try {
      return await this.cardRepository.GetAllCardRepo();
    } catch (error) {
      throw error;
    }
  }

  async GetByIdService(id: string): Promise<ICard | null> {
    try {
      return await this.cardRepository.findById(id);
    } catch (error) {
      console.log(error);
    }
  }

  // update card
  async updateCardService(id: string, UpdateData: Partial<ICard>): Promise<ICard | null>{
    try{
      return await this.cardRepository.update(id,UpdateData)

    }catch(error){
      throw error;
    }

  }

  // delete card
   async DeleteCardService(id: string):Promise<ICard|null>{
    try{
      return await this.cardRepository.delete(id)

    }catch(error){
      throw error

    }
   }
  
}
