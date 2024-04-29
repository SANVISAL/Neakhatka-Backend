import mongoose, { Schema, Document, Model } from 'mongoose';

export interface UserProfille extends Document{
  _id: mongoose.Types.ObjectId;
  profilePicture: string;
  firstName: string;
  lastName: string;
  email: string;
  contactPhone: string;
  gender: string;
  location: string;
  dateOfBirth: Date;
  nationality: string;
  address: string;
  educationBackground: string;
  favoriteCards: mongoose.Types.ObjectId[]; // Array of card IDs
}

const cardSchema: Schema<UserProfille> = new Schema({
  profilePicture: {
    type: String,
    // required: true
  },
  firstName: {
    type: String,
    // required: true
  },
  lastName: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    // required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  contactPhone: {
    type: String,
    // required: true
  },
  gender: {
    type: String,
    // required: true
  },
  location: {
    type: String,
    // required: true
  },
  dateOfBirth: {
    type: Date,
    // required: true
  },
  nationality: {
    type: String,
    // required: true
  },
  address: {
    type: String,
    // required: true
  },
  educationBackground: {
    type: String,
    // required: true
  },
  favoriteCards: [{ type: mongoose.Types.ObjectId, ref: 'Card' }] 
});

const UserModel: Model<UserProfille> = mongoose.model<UserProfille>('UserModel', cardSchema);

export { UserModel };
