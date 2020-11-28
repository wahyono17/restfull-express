const mongoose = require("mongoose");
const ProductQty = require("../../models/productQuantity");

const productQuantityPatch = (req, res, next) => {
    const id = req.params.productId;

    ProductQty.find({product_id:id})
        .exec()
        .then(result=>{
            /*********ini untuk menjumlah array quantity karena ada nilai plus dan minus*/
            let initialValue = 0;
            let arr = result;
            let balanceProduct = arr.reduce(function(accumulator,curentValue){
                return accumulator + curentValue.quantity;
            },initialValue);
            /******** */

            if(balanceProduct == req.body.quantity){
                next();
            }else{
                const productQty = new ProductQty({
                    _id: new mongoose.Types.ObjectId(),
                    product_id:id,
                    transaction_type:2, //update qty
                    quantity:req.body.quantity - balanceProduct,
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
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err, status: 500
            });
          })
}

module.exports = productQuantityPatch;