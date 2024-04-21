import {
    Body,
    Controller,
    Post,
    Get,
    Route,
    Path,
    SuccessResponse,
    Response,
    Put,
    UploadedFile,
    Delete,
  } from "tsoa";
  import { CardService } from "../service/CardService";
  import { ICard } from "../model/CardModel";
  
  @Route("Cards")
  export class CardController extends Controller {
    private cardservice: CardService;
  
    constructor(cardservice: CardService) {
      super();
      this.cardservice = cardservice;
    }
    @Post("/")
    public async CreateCardController(@Body() requestBody: any): Promise<any> {
      try {
        const newCard = await this.cardservice.CreateCardService(requestBody);
        return newCard;
      } catch (error) {
        throw new Error(error);
      }
    }
    @Get("/")
    public async GetAllCardController(): Promise<ICard[]> {
      return await this.cardservice.GetAllCardService();
    }
  
    @Get("/:id")
    @SuccessResponse("200", "Successfully retrieved card")
    @Response("404", "Card not found")
    public async GetCardById(@Path() id: string): Promise<any> {
      try {
        const card = await this.cardservice.GetByIdService(id);
        if (card) {
          return card;
        } else {
          return { message: "Card Not Found" };
        }
      } catch (error) {
        console.log(error);
      }
    }
  
    // update card
    @Put("/:id")
    public async UpdateCardController(
      @Path() id: string,
      @Body() UpdateData: Partial<ICard>
    ): Promise<any> {
      const updatecard = await this.cardservice.updateCardService(id, UpdateData);
      if (updatecard) {
        return updatecard;
      } else {
        this.setStatus(404);
        return { message: "Card Not Found" };
      }
    }
  
    // delete card by id
    @Delete("/:id")
    public async DeleteCardContrioller(@Path() id: string): Promise<any> {
      const deletecard = await this.cardservice.DeleteCardService(id);
      if (deletecard) {
        return deletecard;
      } else {
        return { message: "Card Not Found" };
      }
    }
  }
  