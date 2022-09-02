const express = require('express')
const router = express.Router()
const cardController = require('../controllers/cardController') 
const {ensureAuth} = require('../middleware/auth')


router.get('/', ensureAuth, cardController.getCards)

router.post('/createCard', cardController.createCard)

router.post('/:cardID/add/:todoID', cardController.addTodoToCard)

router.route('/editCard/:cardID')
    .get(cardController.editCardPage)
    .put(cardController.editCard)

router.get('/deleteCard/:cardID', cardController.deleteCard)

module.exports = router