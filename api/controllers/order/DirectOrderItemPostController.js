const mongoose = require('mongoose');
const OrderItem = require('../../models/orderItem');
const Product = require('../../models/product');
const OrderHeader = require('../../models/orderHeader');


const OrderDetailPost = (req,res,next)=>{
    Product.findById(req.body.product_id)
        .exec()
        .then(productResult=>{
            const orderItem = new OrderItem({
                _id:mongoose.Types.ObjectId(),
                order_id:req.orderHeader._id,
                product_id:req.body.product_id,
                product_name:productResult.name,
                description:productResult.description,
                price:productResult.price,
                unit:productResult.unit,
                quantity:req.body.quantity,
                amount:req.body.quantity * productResult.price
            });
            orderItem.save()
                .then(orderItemResult=>{
                    //update orderHeader set total = amount
                    OrderHeader.updateOne({_id:req.orderHeader._id},{
                        total:orderItemResult.amount
                    })
                    .exec()
                    .then(totalResult=>{
                        //lalu find karena update hasilnya tidak ada total return
                        OrderHeader.findById(req.orderHeader._id)
                            .exec()
                            .then(orderHeaderResult=>{
                                res.status(201).json({
                                    message:"post order succed",
                                    orderTotal:orderHeaderResult.total,
                                    forderTotal:'Rp ' + new Intl.NumberFormat().format(orderHeaderResult.total),
                                    status:201,
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                });
                            });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

module.exports = OrderDetailPost;