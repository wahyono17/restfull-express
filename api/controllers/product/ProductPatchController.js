const mongoose = require("mongoose");
const Product = require("../../models/product");

const productPatch = (req, res, next) => {
    const id = req.params.productId;

    Product.updateOne({ _id: id }, {
      name:req.body.name,
      description:req.body.description,
      unit:req.body.unit,
      price:req.body.price,
    })
      .exec()
      .then(result => {
        res.status(200).json({
          message:"rubah berhasil",status:200
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err, status: 500
        });
      });
}

module.exports = productPatch;