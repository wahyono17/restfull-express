const mongoose = require('mongoose');
const OrderHeader = require('../../models/orderHeader');
const OrderStatus = require('../../models/orderStatus');

const OrderPost = (req,res,next)=>{
    const orderHeader = new OrderHeader({
        _id: mongoose.Types.ObjectId(),
        user_id: req.userData.userId,
        date:Date.now(),
        store_id:req.body.store_id,
        note:req.body.note,
    });
    orderHeader.save()
        .then(orderHeaderResult=>{
            req.orderHeader = orderHeaderResult;

            //buat orderStatus
            const orderStatus = new OrderStatus({
                _id: mongoose.Types.ObjectId(),
                order_id:orderHeaderResult._id,
                code:1,
                description:"dipesan",
                date:Date.now(),
            });
            orderStatus.save()
                .then(orderStatusResult=>{
                    OrderHeader.updateOne({_id:req.orderHeader._id},{
                        order_status_id:orderStatusResult._id
                    })
                        .exec()
                        .then(updateOrderHeaderResult=>{
                            next();
                            //next ke order item
                        })
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
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

module.exports = OrderPost