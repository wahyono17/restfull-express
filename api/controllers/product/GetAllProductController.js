const mongoose = require("mongoose");
const Product = require("../../models/product");

const allProduct = (req,res,next)=>{
  const ids = req.userData.userId;
  Product.aggregate([
    {
      $match:{
          user_id:{$nin:[new mongoose.Types.ObjectId(ids)]},
          status:{$nin:['X']}
      }
    },
    {
      $lookup:{
        from:"productquantities",
        localField:"_id",
        foreignField:"product_id",
        as: "quantity_docs"
      }
    },
    {
      $lookup:{
          from:"profiles",
          localField:"user_id",
          foreignField:"user_id",
          as: "profile"
      }
    },
  ])
  .exec()
  .then(docs=>{
    // res.send(docs);

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

module.exports = allProduct;