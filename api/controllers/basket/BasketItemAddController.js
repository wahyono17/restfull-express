const mongoose = require("mongoose");
const BasketItem = require("../../models/basketItem");

const BasketAdd = (req, res, next) => {
    //console.log(req.headerId);
    const basket = new BasketItem({
        _id:mongoose.Types.ObjectId(),
        header_id:req.headerId,
        product_id:req.body.product_id,
        quantity:req.body.quantity,
    });
    basket.save()
    .then(result=>{
        res.status(201).json({
            message:"post succed",
            status:201,
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

module.exports = BasketAdd;