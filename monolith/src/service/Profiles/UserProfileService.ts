import {
  UserModel,
  UserProfille,
} from "../../model/ProfileModel/UserProfielModel";
import { UserRepository } from "../../repository/Profile/UserProfileRepository";

export class UserService {
  private userRepository: UserRepository;
  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  async GetAllProfileervice(): Promise<UserProfille[]> {
    try {
      return await this.userRepository.GetAllUserRepo();
    } catch (error) {
      throw error;
    }
  }

  async GetByIdService(id: string): Promise<UserProfille | null> {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      console.log(error);
    }
  }

  // update card
  async updateProfileService(
    id: string,
    UpdateData: Partial<UserProfille>
  ): Promise<UserProfille | null> {
    try {
      return await this.userRepository.updateUser(id, UpdateData);
    } catch (error) {
      throw error;
    }
  }

  // delete card
  async DeleteProfileService(id: string): Promise<UserProfille | null> {
    try {
      return await this.userRepository.deleteUser(id);
    } catch (error) {
      throw error;
    }
  }
}
