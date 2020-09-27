const Basket = require("../../models/basketHeader");
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
                from:"profiles",
                localField:"user_product_id",
                foreignField:"user_id",
                as: "profile"
            }
        },

        //lookup untuk basket item dengan product namenya
        {
            $lookup:{
                from:"basketitems",
                localField:"_id",
                foreignField:"header_id",
                as:"basketitem"
            }
        },
        {
            $unwind:{path:"$basketitem",preserveNullAndEmptyArrays: true}
        },
        {
            $lookup:{
                from:"products",
                localField:"basketitem.product_id",
                foreignField:"_id",
                as:"basketitem.product"
            }
        },
        {
          $group:{
              _id:"$_id",
              user_id:{$first:"$user_id"},
              user_product_id:{$first:"$user_product_id"},
              profile:{$first:"$profile"},
              basket_item:{$push:{
                  product_id:"$basketitem.product_id",
                  quantity:"$basketitem.quantity",
                  product_name:"$basketitem.product"
              }}
          }
        }

    ])
    .exec()
    .then(result=>{
        //res.send(result);
        req.basket = result;
        //res.send(result);
        next();
    })
    .catch()
}

module.exports =  MyBasket;