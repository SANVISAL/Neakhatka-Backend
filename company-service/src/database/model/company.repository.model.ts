import { Schema, model } from "mongoose";

const companySchema: Schema = new Schema(
  {
    companyName: { type: String, required: true },
    logo: { type: String, required: true, default: "" },
    contactPhone: { type: Number, required: true, default: "" },
    contactEmail: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    websiteLink: { type: String, required: false, default: "" },
    location: { type: String, required: false, default: "" },
    contactPerson: { type: String, required: true, default: "" },
    numberOfEmployees: { type: Number, required: false, default: "" },
    address: { type: String, required: false, default: "" },
    companyDescription: { type: String, required: false, default: "" },
    userId: { type: String, required: false, default: "" },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CompanyModel = model("Company", companySchema);

export { CompanyModel };
