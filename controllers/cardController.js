const Card = require('../models/Card')

/**
 * route:   /cards
 */

 const getCards = async (req, res) => {
    try{
        const cards = await Card.find({userId: req.user.id})
        console.log('cards found')
        res.render('cards.ejs', {cards: cards, user: req.user})
    }catch(err){
        console.log(err)
    }
}

const createCard = async (req, res) => {
    try{
        await Card.create({
            userId: req.user.id,
            cardName: req.body.cardName
        })
        console.log('Card created')
        res.redirect('/cards')
    }catch(err){
        console.log(err)
    }
}

const deleteCard = async (req, res) => {    
    try {
        await Card.findOneAndDelete({_id:req.body.cardId});
        console.log('Deleted Card');
        res.json('Deleted Card');
    }
    catch(err){
        console.log(err);
    }
}

const editCardPage = () => {

}

const editCard = async(req, res) => {
    try{
        await Card.findOneAndUpdate({userId: req.user.id},{
                cardName: req.cardName
        })
        console.log('Card has been updated')
        res.json('Card Updated')
    }catch(err){
        console.log(err)
    }
}

const addTodoToCard = () => {

}


module.exports = {
    createCard,
    deleteCard,
    editCard,
    editCardPage,
    addTodoToCard,
    getCards,
}