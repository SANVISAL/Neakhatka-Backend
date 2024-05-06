import mongoose, { Document, Model } from "mongoose";

export interface IAuth {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  isVerified?: boolean;
}

export interface IAuthDocument extends Document {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
  isVerified?: boolean;
  googleId?: string;
}

export interface IAuthModel extends Model<IAuthDocument> {}

const authSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user", "guest"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  {
    toJSON: {
      transform(_doc, ret) {
        delete ret.password;
        delete ret.googleId;
        delete ret.__v;
      },
    },
  }
);

const AuthModel = mongoose.model<IAuthDocument, IAuthModel>(
  "AuthModel",
  authSchema
);

export default AuthModel;
