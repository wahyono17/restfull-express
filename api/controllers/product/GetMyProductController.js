const mongoose = require("mongoose");
const Product = require("../../models/product");

const myProduct = (req,res,next)=>{
  const ids = req.userData.userId;
  Product.aggregate([
    {
      $match:{
          user_id:new mongoose.Types.ObjectId(ids)
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

module.exports = myProduct;