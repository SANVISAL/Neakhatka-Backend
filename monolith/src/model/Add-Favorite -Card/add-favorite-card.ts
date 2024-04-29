import mongoose, { Schema, Document } from 'mongoose';

export  interface FavoriteCard extends Document {
  userId: mongoose.Types.ObjectId; // Reference to the user who favorited the card
  cardId: mongoose.Types.ObjectId; // Reference to the favorited card
}

const favoriteCardSchema: Schema<FavoriteCard> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel', // Reference to the User model
    required: true
  },
  cardId: {
    type: Schema.Types.ObjectId,
    ref: 'Card', // Reference to the Card model
    required: true
  }
});

const FavoriteCardModel = mongoose.model<FavoriteCard>('FavoriteCard', favoriteCardSchema);

export { FavoriteCardModel };
