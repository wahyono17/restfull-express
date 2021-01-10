const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkProfile = require('../middleware/check-profile');
const validateStatusNumber = require('../controllers/orderStatus/validateStatusNumber');
const productQuantityOrder = require('../controllers/productQty/productQuantityOrderStatus');

//proses pengurangan stock terjadi ketika rubah status di proses, saat ini belum di buat codenya
//order status description hanya dlm bahasa ind,
//1 dipesan, 2 dibatalkan(penjual,pembeli), 3 dibayar(sementara oleh admin app)
//4 diproses (penjual), 5 barang siap diambil(penjual), 6 barang korfirmasi sudah diambil(pembeli)

const OrderByIdAndValidate = require('../controllers/order/OrderByIdAndValidateController');
const OrderStatusController = require('../controllers/orderStatus/OrderStatusController');
const ChangeOrderStatusController = require('../controllers/order/ChangeOrderStatusController');
const OrderStatusResource = require('../resources/OrderStatusResource');
const test = require('../controllers/productQty/test');

router.post('/', checkAuth, checkProfile,validateStatusNumber,OrderByIdAndValidate ,OrderStatusController
        ,productQuantityOrder,ChangeOrderStatusController, OrderStatusResource);

router.post("/test", test);
module.exports = router;
