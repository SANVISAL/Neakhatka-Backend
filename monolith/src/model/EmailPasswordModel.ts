import mongoose, { Schema, Model } from 'mongoose';

export interface EmailPassword  {
  email: string;
  password: string;
}

const emailPasswordSchema: Schema<EmailPassword> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const EmailPasswordModel: Model<EmailPassword> = mongoose.model<EmailPassword>('EmailPassword', emailPasswordSchema);

export { EmailPasswordModel };
