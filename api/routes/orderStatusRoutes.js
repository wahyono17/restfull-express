const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkProfile = require('../middleware/check-profile');

//proses pengurangan stock terjadi ketika rubah status di proses, saat ini belum di buat codenya
//order status description hanya dlm bahasa ind, 1 dipesan, 2 dibatalkan(penjual,pembeli), 3 dibayar(sementara oleh admin app)
//4 diproses (penjual), 5 barang siap diambil(penjual), 6 barang korfirmasi sudah diambil(pembeli)

const OrderByIdAndValidate = require('../controllers/order/OrderByIdAndValidateController');
const OrderStatusController = require('../controllers/orderStatus/OrderStatusController');
const ChangeOrderStatusController = require('../controllers/order/ChangeOrderStatusController');
const OrderStatusResource = require('../resources/OrderStatusResource');

router.post('/', checkAuth, checkProfile,OrderByIdAndValidate,OrderStatusController, ChangeOrderStatusController
        , OrderStatusResource);

module.exports = router;
