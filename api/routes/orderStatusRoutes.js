const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const OrderStatusController = require('../controllers/orderStatus/OrderStatusController');
const OrderStatusResource = require('../resources/OrderStatusResource');

router.post('/', checkAuth, OrderStatusController
        , OrderStatusResource);

module.exports = router;
