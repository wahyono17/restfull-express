const mongoose = require("mongoose");
const Product = require("../models/product");


exports.allProduct = (req, res, next) => {
    Product.find()
      .select("name description unit price productImage _id")
      .exec()
      .then(docs => {
        const response = {
          data:docs,
          status:200,
        };
        res.status(200).json(response);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err, status:500
        });
      });
}

exports.myProduct = (req,res,next)=>{
  Product.find({user_id:req.userData.userId})
    .select("name description unit price productImage _id")
    .exec()
    .then(docs=>{
      //console.log(docs);
      const response = {
        data:docs,
        status:200,
      }
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err, status:500
      });
    });
}

exports.productPost = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    user_id: req.userData.userId,
    name: req.body.name,
    description:req.body.description,
    unit:req.body.unit,
    price: req.body.price,
    productImage: req.file.filename
  });
  product
    .save()
    .then(result => {
      res.status(201).json({
        data: {
          name: result.name,
          description:result.description,
          unit:result.unit,
          price: result.price,
          productImage : result.productImage,
          _id: result._id,
        },
        status: 201,
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err, status:500
      });
    });
}

exports.productGet = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .select("name description unit price productImage _id")
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json({
            data: doc,
            status : 200,
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID", status:404 });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err, status:500 });
    });
}

exports.productPatch = (req, res, next) => {
  const id = req.params.productId;

  //ini jika tidak ada gambar baru maka memakai gambar yang ada didatabase, jika ada maka ambil yang baru
  let newImage;
    if(req.file){
      newImage = req.file.filename;
    }else{
      newImage = req.currentProduct.productImage;
    }

  Product.updateOne({ _id: id }, {
    name:req.body.name,
    description:req.body.description,
    unit:req.body.unit,
    price:req.body.price,
    productImage:newImage,
  })
    .exec()
    .then(result => {
      Product.findById(id)
        .select("name description unit price productImage _id")
        .exec()
        .then(doc => {
          if (doc) {
            res.status(200).json({
                data: doc,
                status : 200,
            });
          } else {
            res
              .status(404)
              .json({ message: "No valid entry found for provided ID", status:404});
          }
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ error: err, status:500});
        });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err, status: 500
      });
    });
}

exports.deleteProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.deleteOne({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Product deleted',
        status:200
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err, status:500
      });
    });
}