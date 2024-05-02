import { IUserProfille } from "../../models/userprofile/userprofilel-model";
  import { UserRepository } from "../../repository/userRepository/userProfileRepo";
  
  export class UserService {
    private userRepository: UserRepository;
    constructor(userRepository: UserRepository) {
      this.userRepository = userRepository;
    }
    async GetAllProfileervice(): Promise<IUserProfille[]> {
      try {
        return await this.userRepository.GetAllUserRepo();
      } catch (error) {
        throw error;
      }
    }
  
    async GetByIdService(id: string): Promise<IUserProfille | null> {
      try {
        return await this.userRepository.findById(id);
      } catch (error) {
        console.log(error);
        return null
      }
    }
  
    // update card
    async updateProfileService(
      id: string,
      UpdateData: Partial<IUserProfille>
    ): Promise<IUserProfille | null> {
      try {
        return await this.userRepository.updateUser(id, UpdateData);
      } catch (error) {
        throw error;
      }
    }
  
    // delete card
    async DeleteProfileService(id: string): Promise<IUserProfille | null> {
      try {
        return await this.userRepository.deleteUser(id);
      } catch (error) {
        throw error;
      }
    }
  }
  