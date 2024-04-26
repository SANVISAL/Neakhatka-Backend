import mongoose, { Schema, Document, Model, ObjectId } from 'mongoose';

export interface CompanyVerification {
  CompanyId: ObjectId; // Use ObjectId type explicitly
  token: string;
  createdAt: Date;
  expiresAt: Date;
}

const companyverificationSchema: Schema<CompanyVerification> = new Schema({
  CompanyId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'CompanyAuthModel' // Reference to the Auth model
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true
  }
});

const CompanyVerificationModel: Model<CompanyVerification & Document> = mongoose.model<CompanyVerification & Document>('CompanyVerificationModel', companyverificationSchema);

export { CompanyVerificationModel };
