const orderHeader = require("../../models/orderHeader");
const mongoose = require('mongoose');

const myOrder = (req,res,next)=>{
    const ids = req.userData.userId;
    orderHeader.aggregate([
        {
            $match:{
                user_id:new mongoose.Types.ObjectId(ids)
            }
        },
        {
            $lookup:{
                from:"orderstatuses",
                localField:"order_status_id",
                foreignField:"_id",
                as:"orderstatus"
            }
        },
        {
            $lookup:{
                from:"profiles",
                localField:"store_id",
                foreignField:"user_id",
                as: "profile"
            }
        },
        {
            $lookup:{
                from:"orderitems",
                localField:"_id",
                foreignField:"order_id",
                as:"orderitem"
            }
        },
    ])
    .exec()
    .then(
        result=>{
            //res.send(result);
            req.order = result;
        }
    )
    .catch()
}

module.exports = myOrder;