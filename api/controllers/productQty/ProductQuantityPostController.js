const mongoose = require("mongoose");
const ProductQty = require("../../models/productQuantity");

const productQuantityPost = (req, res, next) => {
    //console.log(req.files);
    const productQty = new ProductQty({
      _id: new mongoose.Types.ObjectId(),
      product_id:req.product._id,
      transaction_type:1, //opening product
      quantity:req.body.quantity,
    });
    productQty
      .save()
      .then(result => {
        req.productQty = result;
        next();

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err, status:500
        });
      });
}

module.exports = productQuantityPost;