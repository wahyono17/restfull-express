const express = require('express');
const app = express(); //execute express spt fungsi, tanda () berarti telah di exekusi

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

app.use('/products', productRoutes); //semua ke /product akan di lempar ke productRoutes
app.use('/orders', orderRoutes);

module.exports = app;