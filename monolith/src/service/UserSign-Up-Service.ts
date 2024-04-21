
import { UserModel, UserProfille } from "../model/UserProfielModel";
import { UserRepository } from "../repository/UserRepository";
import { EmailPasswordModel, EmailPassword } from "../model/EmailPasswordModel";

export class UserService {
  private userRepository: UserRepository;
  constructor(cardRepository: UserRepository) {
    this.userRepository = cardRepository;
  }

  async CreateUserService(
    userProfileData: UserProfille,
    email: string,
    password: string
  ): Promise<any> {
    try {
      // Validate UserData before saving
      if (
        ! userProfileData ||
        ! userProfileData.profilePicture ||
        ! userProfileData.firstName ||
        ! userProfileData.lastName ||
        ! userProfileData.contactPhone ||
        ! userProfileData.gender ||
        ! userProfileData.location ||
        ! userProfileData.dateOfBirth ||
        ! userProfileData.nationality ||
        ! userProfileData.address ||
        ! userProfileData.educationBackground
      ) {
        throw new Error("Required fields are missing");
      }

      const newUSer = await this.userRepository.CreateNewUser(
        userProfileData,
        email,
        password
      );
      return {
        status: "Succecss",
        message: "Sign up Successfully",
        data: newUSer,
      };
    } catch (error) {
      console.log(error);
    }
  }
  // GET ALL USER
  async GetAllUserService(): Promise<UserProfille[]> {
    try {
      return await this.userRepository.GetAllUserRepo();
    } catch (error) {
      throw error;
    }
  }
  //GET ALL EMAIL AND PASSWORD
  async GetAllEmailPasswordService(): Promise<EmailPassword[]> {
    try {
      return await this.userRepository.GetAllEmailPassword();
    } catch (error) {
      throw error;
    }
  }
  // GET USER BY ID
  async GetByIdService(id: string): Promise<UserProfille | null> {
    try {
      return await this.userRepository.findById(id);
    } catch (error) {
      console.log(error);
    }
  }
  // GET EMAIL AND PASSWORD
  async GetemailpasswordByIdservice(id: string): Promise<EmailPassword | null> {
    try {
      return await this.userRepository.findemailpasswordbyid(id);
    } catch (error) {
      throw error;
    }
  }

  // update card
  async updateUserService(
    id: string,
    UpdateData: Partial<UserProfille>
  ): Promise<UserProfille | null> {
    try {
      return await this.userRepository.updateUser(id, UpdateData);
    } catch (error) {
      throw error;
    }
  }
  // UPDATE EMAIL AND PASSWORD SERVICE
  async updateemailpassword(
    id: string,
    updateData: Partial<EmailPassword | null>
  ): Promise<EmailPassword | null> {
    try {
      return await this.userRepository.updateemailpassword(id, updateData);
    } catch (error) {
      throw error;
    }
  }

  // delete card
  async DeleteUserService(id: string): Promise<UserProfille | null> {
    try {
      return await this.userRepository.deleteUser(id);
    } catch (error) {
      throw error;
    }
  }
  //  DELETE EMAIL AND PASSOWORD
  async Deleteemailpassword(id: string): Promise<EmailPassword | null> {
    try {
      return await this.userRepository.deleteemailpassword(id);
    } catch (error) {
      throw error;
    }
  }
}
