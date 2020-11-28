const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkProfile = require('../middleware/check-profile');

const GetSingleOrderController = require('../controllers/order/GetSingleOrderController');
const OrderPostBasketController = require('../controllers/order/OrderPostBasketController');
const OrderItemPostController = require('../controllers/order/OrderItemPostController');
const DirectOrderHeaderPostController = require('../controllers/order/DirectOrderHeaderPostController');
const DirectOrderItemPostController = require('../controllers/order/DirectOrderItemPostController');
const MyOrderController = require('../controllers/order/MyOrderGetController');
const MyStoreOrderGetController = require('../controllers/order/MyStoreOrderGetController');
const MyOrderResource = require('../resources/MyOrderResource');


router.get('/myorders', checkAuth, MyOrderController, MyOrderResource);
router.get('/mystoreorders', checkAuth, MyStoreOrderGetController, MyOrderResource);

router.post('/',checkAuth,checkProfile,OrderPostBasketController, OrderItemPostController);

router.post('/direct',checkAuth, checkProfile,DirectOrderHeaderPostController, DirectOrderItemPostController);

router.get('/:orderId', checkAuth, GetSingleOrderController,MyOrderResource);

module.exports = router;