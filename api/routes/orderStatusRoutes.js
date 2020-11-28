const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkProfile = require('../middleware/check-profile');

const OrderByIdAndValidate = require('../controllers/order/OrderByIdAndValidateController');
const OrderStatusController = require('../controllers/orderStatus/OrderStatusController');
const ChangeOrderStatusController = require('../controllers/order/ChangeOrderStatusController');
const OrderStatusResource = require('../resources/OrderStatusResource');

router.post('/', checkAuth, checkProfile,OrderByIdAndValidate,OrderStatusController, ChangeOrderStatusController
        , OrderStatusResource);

module.exports = router;
