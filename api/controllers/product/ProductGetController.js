const mongoose = require("mongoose");
const Product = require("../../models/product");

const productGet = (req, res, next) => {
    const id = req.params.productId;
    Product.aggregate([
      {
        $match:{
            _id:new mongoose.Types.ObjectId(id)
        }
      },
      {
        $lookup:{
          from:"productquantities",
          localField:"_id",
          foreignField:"product_id",
          as: "quantity_docs"
        }
      }
    ])
    .exec()
    .then(docs=>{
      //res.send(docs);

      req.product = docs;
      next();
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err, status:500
      });
    });
}

module.exports = productGet;