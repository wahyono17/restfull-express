const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const BasketAddController =  require('../controllers/basket/BasketAddController');
const MyBasketController = require('../controllers/basket/MyBasketController');
const BasketResource = require('../resources/MyBasketResource');

router.post('/', checkAuth, BasketAddController);
router.get('/', checkAuth, MyBasketController, BasketResource);

module.exports = router;