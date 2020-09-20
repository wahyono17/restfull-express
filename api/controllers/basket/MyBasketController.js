const Basket = require("../../models/basket");
const mongoose = require('mongoose');

const MyBasket = (req,res,next)=>{
    const ids = req.userData.userId;
    Basket.aggregate([
        {
            $match:{
                user_id:new mongoose.Types.ObjectId(ids)
            }
        },
        {
            $lookup:{
                from:"products",
                localField:"product_id",
                foreignField:"_id",
                as: "product_docs"
            }
        },
        {
            $lookup:{
                from:"profiles",
                localField:"user_product_id",
                foreignField:"user_id",
                as: "profile_docs"
            }
        },

    ])
    .exec()
    .then(result=>{
        //res.send(result);
        req.basket = result;
        next();
    })
    .catch()
}

module.exports =  MyBasket;