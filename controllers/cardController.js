const Card = require('../models/Card')

/**
 * Displays a list of the user's cards.
 * Route:   /cards
 * Method:  GET
 */
const getCards = async (req, res) => {
  try {
    const cards = await Card
      .find({
        userId: req.user.id
      })
      .populate(['todos'])
      .lean()
    console.log(`${cards.length} cards found`)
    // console.log(cards[0].todos)
    res.render('cards.ejs', {
      cards,
      user: req.user,
    })
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
 * Route:   /cards/deleteCard/:cardID
 * Method:  DELETE
*/
const deleteCard = async (req, res) => {
  try {
    await Card
      .findByIdAndDelete(req.params.cardID)
    // await Card.findOneAndDelete(req.params.card)

    console.log('Deleted Card');
    res.redirect('/cards');
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
  try {
    console.log('Adding task to card')
    const card = await Card
      .findById(req.params.cardID)
    if (!card) res.status(404).json('No card found by that ID')

    console.log(card)
    card.todos.push(req.params.todoID)

    card.save()
    res.status(200).json(`${req.params.todoID} was added to req.params.cardID`)
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
}

module.exports = {
  createCard,
  deleteCard,
  editCard,
  editCardPage,
  addTodoToCard,
  getCards,
}
