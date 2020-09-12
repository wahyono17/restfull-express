const mongoose = require("mongoose");

const Order = require("../models/order");
const Product = require("../models/product");

const orderPost = (req, res, next) => {
    /*********ini hanya validasi untuk cek apakah product ada atau tidak */
    Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
    /*********************** */

      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        date:Date.now(),
        product_id: req.body.productId,
        price:req.product.price,
        quantity: req.body.quantity,
        amount:req.product.price * req.body.quantity,
        ordered_by:req.userData.userId,
        status_code: 1,
        note: req.body.note,
      });
      return order.save();
    })

    .then(result => {
       req.order = result;
       next();
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

module.exports = orderPost;