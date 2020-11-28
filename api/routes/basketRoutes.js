const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkProfile = require('../middleware/check-profile');
const BasketItemAddController =  require('../controllers/basket/BasketItemAddController');
const BasketHeaderAddController = require('../controllers/basket/BasketHeaderAddController');
const MyBasketController = require('../controllers/basket/MyBasketController');
const BasketResource = require('../resources/MyBasketResource');

router.post('/', checkAuth, checkProfile,BasketHeaderAddController.validate('postBasket'), BasketHeaderAddController.BasketHeader
    , BasketItemAddController);
router.get('/', checkAuth, MyBasketController ,BasketResource);

module.exports = router;