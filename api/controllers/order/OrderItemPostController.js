const mongoose = require('mongoose');
const OrderItem = require('../../models/orderItem');
const Product = require('../../models/product');
const basketItem = require('../../models/basketItem');

const OrderDetailPost = (req,res,next)=>{
    req.arrayBasketItem.forEach(element => {
        Product.findById(element.product_id)
            .exec()
            .then(product=>{
                //res.send(product);
                const orderItem = new OrderItem({
                    _id:mongoose.Types.ObjectId(),
                    order_id:req.orderHeader._id,
                    product_id:element.product_id,
                    product_name:product.name,
                    description:product.description,
                    price:product.price,
                    unit:product.unit,
                    quantity:element.quantity,
                    amount:product.price * element.quantity,
                });
                orderItem.save()
                //remove basketItem berdasarkan element._id
                .then(orderItemResult=>{
                    basketItem.deleteOne({id:element._id})
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
            })
            .catch(err => {
                res.status(500).json({
                  error: err, status:500
                });
            });
    });
    res.status(201).json({
        message:"post order succed",
        status:201,
    });

}

module.exports = OrderDetailPost;