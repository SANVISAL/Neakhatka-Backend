import mongoose, { Schema, Document, Model } from 'mongoose';

export interface CompanyAuth {
  CompanyName: string;
  email: string;
  password: string;
  role: string;
  isVerified?: boolean;
}

const comapanyauthSchema: Schema<CompanyAuth> = new Schema({
    CompanyName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['admin', 'user', 'guest','seeker'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});

const CompanyAuthModel: Model<CompanyAuth & Document> = mongoose.model<CompanyAuth & Document>('CompanyAuthModel', comapanyauthSchema);

export { CompanyAuthModel };
