import mongoose, { Schema, Document, Model, ObjectId } from 'mongoose';

export interface Verification {
    userId: ObjectId; // Use ObjectId type explicitly
    token: string;
    createdAt: Date;
    expiresAt: Date;
}

const verificationSchema: Schema<Verification> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'AuthModel' // Reference to the Auth model
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

const VerificationModel: Model<Verification & Document> = mongoose.model<Verification & Document>('VerificationModel', verificationSchema);

export { VerificationModel };
