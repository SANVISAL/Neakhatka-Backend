import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICompany {
  companyName: string;
  contactPhone: string;
  websiteLink: string;
  location: string;
  contactEmail: string;
  contactPerson: string;
  numberOfEmployees: number;
  address: string;
  companyDescription: string;
}

const companySchema: Schema<ICompany & Document> = new Schema({
  companyName: {
    type: String,
    // required: true
  },
  contactPhone: {
    type: String,
    // required: true
  },
  websiteLink: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
    // required: true
  },
  contactEmail: {
    type: String,
    // required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  contactPerson: {
    type: String,
    // required: true
  },
  numberOfEmployees: {
    type: Number,
    // required: true
  },
  address: {
    type: String,
    // required: true
  },
  companyDescription: {
    type: String,
    // required: true
  },
});

const CompanyModel: Model<ICompany & Document> = mongoose.model<
  ICompany & Document
>("CompanyModel", companySchema);

export { CompanyModel };
