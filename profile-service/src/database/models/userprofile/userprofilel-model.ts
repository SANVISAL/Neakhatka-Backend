import mongoose, { Schema, model } from "mongoose";

const userschema: Schema = new Schema({
  profilePicture: { type: String, required: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  contactPhone: { type: String, required: false },
  gender: { type: String, required: false },
  location: { type: String, required: false },
  dateOfBirth: { type: String, required: true },
  nationality: { type: String, required: false },
  address: { type: String, required: false },
  educationBackground: { type: String, required: false },
  favoriteCards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
}, {
  versionKey: false,
  timestamps: true,
});

const UserProfile = model("UserModel", userschema);

export { UserProfile };
