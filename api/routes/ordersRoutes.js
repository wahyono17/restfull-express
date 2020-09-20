const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrdersController = require('../controllers/orders');
const OrderPostController = require('../controllers/order/OrderPostController');
const ProductByIdService = require('../service/productOrderById');
const OrderStatusPostController = require('../controllers/OrderStatusPostController');
const OrderPostResource = require('../resources/OrderPostResource');
const OrderPostBucketController = require('../controllers/order/OrderPostBucketController');

// Handle incoming GET requests to /orders
router.get('/', checkAuth, OrdersController.orders_get_all );

router.post('/',OrderPostBucketController);
// router.post('/', checkAuth, ProductByIdService ,OrderPostController, OrderStatusPostController
//         , OrderPostResource);

router.get('/:orderId', checkAuth, OrdersController.orders_get_order);

router.delete('/:orderId', checkAuth, OrdersController.orders_delete_order);

module.exports = router;