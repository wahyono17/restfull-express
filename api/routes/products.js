const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

//const upload = multer({dest: 'uploads/'});//kode lama langsung upload

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const original = file.originalname; //original name yg di upload
    const ext = original.substr(original.length - 5);//ambil 5 string terakhir pasti itu sudah termasuk extension
    const regex = /[^\w\s]/g;//temukan selain word/kata atau whitepsace
    const dot = ext.search(regex);
    cb(null, uniqueSuffix + ext.substr(dot));//ambil setelah . sebagai extension
  }
});

const fileFilter = (req, file, cb) => {
  // jika jpg dan png maka di terima, selain itu riject
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const upload = multer({
  storage: storage,
  limits: {fileSize: 1024 * 1024 * 5},
  fileFilter: fileFilter
});

const Product = require("../models/product");

router.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id productImage")
    .exec()
    .then(docs => {
      //console.log(docs);
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            productImage: doc.productImage,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + doc._id
            }
          };
        })
      };

      res.status(200).json(response);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

//upload didepan midleware lain artinya upload dulu baru midleware lain, single artinya upload 1 file saja
router.post("/", checkAuth, upload.single('productImage'), (req, res, next) => {
  //console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.filename
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
          name: result.name,
          price: result.price,
          productImage : result.productImage,
          _id: result._id,
          request: {
              type: 'GET',
              url: "http://localhost:3000/products/" + result._id
          }
      }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("name price _id productImage")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
            product: doc,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/products'
            }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:productId", checkAuth, (req, res, next) => {
  const id = req.params.productId;

  //** ini hanya untuk mengecek apakah di ganti semua atau hanya sebagian saja */
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  //**---------------- */

  Product.updateOne({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Product updated',
        request: {
            type: 'GET',
            url: 'http://localhost:3000/products/' + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:productId", checkAuth, (req, res, next) => {
  const id = req.params.productId;
  Product.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product deleted',
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});


module.exports = router;
