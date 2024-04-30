
import express, { Router } from 'express';
import { Card } from '../../model/CardModel';
import { UserModel } from '../../model/ProfileModel/UserProfielModel';
const favoriterouter: Router = express.Router();

// Backend Route to Add a Card to Favorites
favoriterouter.post('/add', async (req, res) => {
    try {
      const { userId, cardId } = req.body;
      console.log (req.body)
      console.log("user",userId)
      console.log("card",cardId)
  
      // Verify user authentication (not shown here)
      // Ensure userId and cardId are valid (not shown here)
  
      // Fetch the details of the card using the provided cardId
      const card = await Card.findById(cardId);
  console.log(card)
      // If the card is not found, return an error response
      if (!card) {
        return res.status(404).json({ success: false, message: 'Card not found' });
      }
  
      // Add the card to the user's favorites
      await UserModel.findByIdAndUpdate(userId, { $addToSet: { favoriteCards: card } });
  
      // Return success response
      res.status(200).json({ success: true, message: 'Card added to favorites successfully' });
    } catch (error) {
      console.error('Error adding card to favorites:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
  

export default favoriterouter



















// import Favorite_Card from '../../controller/Favorite_Card/favoriteCard';

// const favoriterouter: Router = express.Router();
// const favoriteCardController = new Favorite_Card();

// // Define route for adding a favorite card
// favoriterouter.post('/add-card', async (req, res) => {
//   try {
//     await favoriteCardController.FavoriteCard(req, res);
//   } catch (error) {
//     console.error('Error handling request:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// export default favoriterouter;
