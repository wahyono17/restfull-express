const mongoose = require("mongoose");
const Product = require("../models/product");

const productPost = (req, res, next) => {
    //console.log(req.files);
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      user_id: req.userData.userId,
      name: req.body.name,
      description:req.body.description,
      unit:req.body.unit,
      price: req.body.price,
    });
    product
      .save()
      .then(result => {
        req.product = result;
        next();

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err, status:500
        });
      });
}

module.exports = productPost;