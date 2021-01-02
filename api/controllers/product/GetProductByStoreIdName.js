const mongoose = require("mongoose");
const Product = require("../../models/product");

const myProduct = (req,res,next)=>{
  const ids = req.params.storeId;
  const name = req.query.name;
  const limit = req.query.limit;
  const page = req.query.page;
  const skip = limit * (page -1);

  Product.aggregate([
    {
      $match:{
          user_id:new mongoose.Types.ObjectId(ids),
          status:{$nin:['X']},
          name:{"$regex":name,"$options": "i"}
      }
    },
    {$limit:limit + skip},
    {$skip:skip},
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
        from:"productimages",
        localField:"_id",
        foreignField:"product_id",
        as:"image_docs",
      }
    }
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

module.exports = myProduct;