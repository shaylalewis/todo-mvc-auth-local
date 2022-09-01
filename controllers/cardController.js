const Card = require('../models/Card')

/**
 * Displays a list of the user's cards.
 * Route:   /cards
 * Method:  GET
 */
const getCards = async (req, res) => {
  try {
    const cards = await Card.find({ userId: req.user.id })
    console.log('cards found')
    res.render('cards.ejs', { cards: cards, user: req.user })
  } catch (err) {
    console.log(err)
  }
}

/**
 * Creates a new card.
 * Route:   /cards/createCard
 * Method:  POST
 */
const createCard = async (req, res) => {
  try {
    await Card.create({
      userId: req.user.id,
      cardName: req.body.cardName
    })
    console.log('Card created')
    res.redirect('/cards')
  } catch (err) {
    console.log(err)
  }
}

/**
 * Deltes the specified card (by ID)
 * Route:   /cards/deleteCard
 * Method:  DELETE
*/
const deleteCard = async (req, res) => {
  try {
    await Card.findOneAndDelete({ _id: req.body.cardId });
    console.log('Deleted Card');
    res.json('Deleted Card');
  }
  catch (err) {
    console.log(err);
  }
}

/**
 * Renders the edit card form with the card's data prefilled
 * Route:   /cards/editCard
 * Method:  GET
*/
const editCardPage = () => {

}

/**
 * Edits the specified card with the data from the form.
 * Route:   /cards/editCard
 * Method:  PUT
*/
const editCard = async (req, res) => {
  try {
    await Card.findOneAndUpdate({ userId: req.user.id }, {
      cardName: req.cardName
    })
    console.log('Card has been updated')
    res.json('Card Updated')
  } catch (err) {
    console.log(err)
  }
}

/**
 * Adds a given itemID to a card
 * Route:   /cards/:cardID/add/:todoID
 * Method:  PUT
*/
const addTodoToCard = async (req, res) => {

}

module.exports = {
  createCard,
  deleteCard,
  editCard,
  editCardPage,
  addTodoToCard,
  getCards,
}
