import accountVerificationModel from "../model/account-verify";

class accountVerificationRepository {
  async CreateVerificationToken({
    userID,
    token,
  }: {
    userID: string;
    token: string;
  }) {
    try {
      const accountverification = new accountVerificationModel({
        userID,
        emailVerificationToken: token,
      });
      const newAccountVerification = await accountverification.save();
      return newAccountVerification;
    } catch (error) {
      console.log(error);
    }
  }

  async FindVeificationToken({ token }: { token: string }) {
    try {
      const existedToken = await accountVerificationModel.findOne({
        emailVerificationToken: token,
      });
      return existedToken;
    } catch (error) {
      console.log(error);
    }
  }
  
  async FindVericationTokenbyID ({id}:{id:string}){
    try{
        const existedToken = await accountVerificationModel.findOne({userID:id})
        return existedToken;
    }catch(error){
        console.log(error)

    }
  }
// delete verify token 
async DeleteVerificationToken({token}: {token: string}){
    try{
        await accountVerificationModel.deleteOne({emailVerificationToken: token})

    }catch(error){
        console.log(error)
    }
}
}

export default accountVerificationRepository;
