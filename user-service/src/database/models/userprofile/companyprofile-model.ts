


import { Schema, model } from "mongoose";

const companyschema: Schema = new Schema({
  logo: { type: String, required: false },
  companyName: { type: String, required: true },
  contactEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  contactPhone: { type: String, required: false },
  websiteLink: { type: String, required: false },
  location: { type: String, required: false },
  contactPerson: { type: String, required: true },
  numberOfEmployees: { type: Number, required: false },
  address: { type: String, required: false },
  companyDescription: { type: String, required: false },
}, {
  versionKey: false,
  timestamps: true,
});

const CompanyProfile = model("UserModel", companyschema);

export { CompanyProfile };

