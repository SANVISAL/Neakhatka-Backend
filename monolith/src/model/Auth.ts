import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Auth {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  isVerified?: boolean;
}

const authSchema: Schema<Auth> = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
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
    enum: ['admin', 'user', 'guest'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  }
});

const AuthModel: Model<Auth & Document> = mongoose.model<Auth & Document>('AuthModel', authSchema);

export { AuthModel };
