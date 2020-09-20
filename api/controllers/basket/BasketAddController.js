const mongoose = require("mongoose");
const Basket = require("../../models/basket");

const BasketAdd = (req, res, next) => {
    const basket = new Basket({
        _id:mongoose.Types.ObjectId(),
        user_id:req.userData.userId, //ambil dari auth
        user_product_id:req.body.user_product_id,
        product_id:req.body.product_id,
        quantity:req.body.quantity,
    });
    basket.save()
    .then(result=>{
        const response = {
            data:result,
            status:200,
          };
          res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
}

module.exports = BasketAdd;