import FavoriteCardRepo from "../../repository/Add-Favorite-Cards/favorite-cards";
class FavoriteCardService {
  private favoriteCardRepo: FavoriteCardRepo;

  constructor() {
    this.favoriteCardRepo = new FavoriteCardRepo();
  }

  async add_favorite_card(userid: string, cardid: string) {
    await this.favoriteCardRepo.Add_Favorite_Card(userid, cardid);
  }
}

export default FavoriteCardService;
