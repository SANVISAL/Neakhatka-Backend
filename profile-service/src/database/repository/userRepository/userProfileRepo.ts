import { UserProfile } from "../../models/userprofile/userprofilel-model";
// import { EmailPassword, EmailPasswordModel } from "../model/EmailPasswordModel";
import { IUserDocument } from "../../@types/user.interface";
import DuplitcateError from "../../../error/duplitcate-error";
import APIError from "../../../error/api-error";
class UserRepository {
  // create user
  async createuser(UserDetail: IUserDocument) {
    try {
      const existingUser = await this.FindUserByEmail({
        email: UserDetail.email,
      });
      if (existingUser) {
        throw new DuplitcateError("Email alredy in use");
      }
      const user = new UserProfile(UserDetail);
      const userresult = await user.save();
      return userresult;
    } catch (error) {
      console.log(error);
      if (error instanceof DuplitcateError) {
        throw new APIError("Enable create user in database");
      }
    }
  }

  // get all user profile
  async GetAllUserRepo(): Promise<IUserDocument[]> {
    try {
      return await UserProfile.find();
      
    } catch (error) {
      throw new APIError("Enable to find user");
    }
  }
  // get profile by id
  async findById({ id }: { id: string }) {
    try {
      const existedUser = await UserProfile.findById(id);
      return existedUser;
    } catch (error) {
      console.log(error);

      throw new APIError("Unable to find user in database ");
    }
  }
  // update profile
  async updateUser({
    id,
    updateData,
  }: {
    id: string;
    updateData: Partial<IUserDocument>;
  }) {
    try {
      const isExist = await this.findById({ id });
      if (!isExist) {
        return "User not Exsite";
      }

      const newuserupdate = await UserProfile.findByIdAndUpdate(
        id,
        {
          set: {
            firstname: updateData.firstName,
            lastname: updateData.lastName,
            profilePicture: updateData.profilePicture,
            contactPhone: updateData.contactPhone,
          },
        },
        { new: true }
      );
      return newuserupdate;
    } catch (error) {
      if (error instanceof APIError) {
        throw new APIError("Unable to update user in database");
      }
    }
  }

  // delete profile
  async deleteUser({ id }: { id: string }) {
    try {
      return await UserProfile.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
  async FindUserByEmail({ email }: { email: string }) {
    try {
      const existinguser = await UserProfile.findOne({ email: email });
      return existinguser;
    } catch (error) {
      // console.log(error);
      if (error instanceof APIError) {
        throw new APIError("Unable to Delete User in database");
      }
    }
  }
}

export default UserRepository;
