const express = require('express');
const app = express(); //execute express spt fungsi, tanda () berarti telah di exekusi
const morgan = require('morgan');//ini untuk logger
const bodyParser = require("body-parser"); //untuk menangkap http request dari http
const mongoose = require("mongoose");

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const { use } = require('./api/routes/products');

mongoose.connect(
//process.env.MONGO_ATLAS_PW ada di nodemon.json
"mongodb+srv://wahyono17:"+ process.env.MONGO_ATLAS_PW +
"@latihan1.vvjam.mongodb.net/Latihan1?retryWrites=true&w=majority",{
    useNewUrlParser: true, useUnifiedTopology: true,
});
//ini untuk implementasi full promise di mongoose
mongoose.Promise = global.Promise;

app.use(morgan('dev'));//untuk membuat log, supaya bisa di baca
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//ini untuk menonactive kan CORS, karena pasti beda server antara client dan server api
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  //semua method post dan put pasti mengirim options dulu sebelum mengirim method
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

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