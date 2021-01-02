const Product = require("../../models/product");
const mongoose = require("mongoose");

module.exports = (req,res,next)=>{
    const ids = req.params.storeId;
    const name = req.query.name;

    Product.countDocuments({
        user_id:new mongoose.Types.ObjectId(ids),
        status:{$nin:['X']},
        name:{"$regex":name,"$options": "i"}
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