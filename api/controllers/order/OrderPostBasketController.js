const mongoose = require('mongoose');
const BasketHeader = require("../../models/basketHeader");
const BasketItem = require("../../models/basketItem");
const OrderHeader = require('../../models/orderHeader');
const OrderStatus = require('../../models/orderStatus');

const OrderPost = (req,res,next)=>{
    //yang di kirim adalah berupa array basket id
    req.body.forEach(element => {
        BasketHeader.findById(element.id)
        .exec()
        .then(result=>{
            //buat order header berdasarkan basket header
            const orderHeader = new OrderHeader({
                _id: mongoose.Types.ObjectId(),
                user_id: req.userData.userId,
                date:Date.now(),
                store_id:result.user_product_id,
                //status_code:1,
                total:result.total,
                note:result.note,
            });
            orderHeader.save()
                .then(orderHeader=>{
                    //cari di basket detail bedasarkan basket id, dan buat order detail
                    BasketItem.find({header_id:result._id})
                        .exec()
                        .then(basketItem=>{
                            req.arrayBasketItem = basketItem;
                            req.orderHeader = orderHeader;
                            //buat orderStatus
                            const orderStatus = new OrderStatus({
                                _id: mongoose.Types.ObjectId(),
                                order_id:orderHeader._id,
                                code:1,
                                description:"order Created",
                                date:Date.now(),
                            });
                            orderStatus.save()
                                .then(orderStatusResult=>{
                                    OrderHeader.updateOne({_id:req.orderHeader._id},{
                                        order_status_id:orderStatusResult._id
                                    })
                                        .exec()
                                        .then()
                                        .catch(err => {
                                            res.status(500).json({
                                              error: err, status:500
                                            });
                                        });
                                })
                                .catch(err => {
                                    res.status(500).json({
                                      error: err, status:500
                                    });
                                });
                            next();
                            //next ke OrderItemPostController dan buat item order
                        })
                        .catch(err => {
                            res.status(500).json({
                              error: err, status:500
                            });
                        });
                })
                .catch(err => {
                    res.status(500).json({
                      error: err, status:50
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
              error: err, status:500, message:"Basket not found"
            });
        });

    });
}

module.exports = OrderPost