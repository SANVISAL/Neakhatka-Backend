import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICard {
  profilePicture: string;
  companyName: string;
  peopleAccess: number;
  jobTitle: string;
  salary: string;
  employment: string;
  location: string;
  deadline: Date;
}

const cardSchema: Schema <ICard>= new Schema({
  profilePicture: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  peopleAccess: {
    type: Number,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  employment: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  }
});

const Card :Model<ICard> = mongoose.model<ICard>('Card', cardSchema);

export {Card};
