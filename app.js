const express = require('express');
const app = express(); //execute express spt fungsi, tanda () berarti telah di exekusi
const morgan = require('morgan');//morgan akan menangasi next id midleware

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const { use } = require('./api/routes/products');

//app.use(morgan('dev'));

app.use('/products', productRoutes); //semua ke /product akan di lempar ke productRoutes
app.use('/orders', orderRoutes);

//ini artinya jika request yg tidak di tangkap oleh manapun
app.use((req,res,next)=>{
    const error = new Error('not found');
    error.status = 404;
    next(error);
});

//jika ada error akan di terima di sini dari midleware error di atas
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    .json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;