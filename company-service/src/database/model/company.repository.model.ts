import { Schema, model, Document, Model } from "mongoose";

export interface ICompanyDocument extends Document {
  companyName?: string;
  logo?: string;
  contactPhone?: number;
  websiteLink?: string;
  location?: string;
  contactEmail?: string | undefined;
  contactPerson: string;
  numberOfEmployees: number;
  address: string;
  companyDescription: string;
  userId?: string;
}

interface ICompanyModel extends Model<ICompanyDocument> {}

const companySchema = new Schema(
  {
    companyName: { type: String, required: true },
    logo: { type: String, required: false, default: "" },
    contactPhone: { type: Number, required: false, default: 0 },
    contactEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    websiteLink: { type: String, required: false, default: "" },
    location: { type: String, required: false, default: "" },
    contactPerson: { type: String, required: false, default: "" },
    numberOfEmployees: { type: Number, required: false, default: 0 },
    address: { type: String, required: false, default: "" },
    companyDescription: { type: String, required: false, default: "" },
    userId: { type: String, required: false, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CompanyModel = model<ICompanyDocument, ICompanyModel>(
  "Company",
  companySchema
);

export { CompanyModel };
