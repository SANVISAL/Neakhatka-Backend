import mongoose, { Document, Model } from "mongoose";
export interface IAccountVerificationOLDocument extends Document {
  userID: mongoose.Types.ObjectId;
  emailVerificationToken: string;
}

export interface IAccountVerificationModel
  extends Model<IAccountVerificationOLDocument> {}

const accountVerificationSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, required: true },
  emailVerificationToken: {
    type: String,
    required: true,
    validate: (value: string): boolean => {
      if (!value || value.length !== 64) {
        console.log("Invalide email");
      }
      return true;
    },
  },
});

const accountVerificationModel = mongoose.model<
  IAccountVerificationOLDocument,
  IAccountVerificationModel
>("Account_Verifcation", accountVerificationSchema);
export default accountVerificationModel;
