const Product = require("../../models/product");
const mongoose = require("mongoose");

module.exports = (req,res,next)=>{
    const ids = req.userData.userId;
    Product.countDocuments({
        user_id:{$nin:[new mongoose.Types.ObjectId(ids)]},
        status:{$nin:['X']}
    })
    .exec()
    .then(result=>{
        req.totaldata = result;
        next();
    })
    .catch(err => {
        // console.log(err);
        res.status(500).json({ error: err });
      });
}