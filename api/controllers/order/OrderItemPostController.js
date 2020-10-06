const mongoose = require('mongoose');
const OrderItem = require('../../models/orderItem');
const basketItem = require('../../models/basketItem');

const OrderDetailPost = (req,res,next)=>{
    //hasil basket item adalah array
    req.arrayBasketItem.forEach(element => {
        //buat order item bedasarkan list di basket item
        const orderItem = new OrderItem({
            _id:mongoose.Types.ObjectId(),
            order_id:req.orderHeader._id,
            product_id:element.product_id,
            product_name:element.product_name,
            description:element.description,
            price:element.price,
            unit:element.unit,
            quantity:element.quantity,
            amount:element.amount,
        });
        orderItem.save()
            .then()
            .catch(err => {
                res.status(500).json({
                  error: err, status:500
                });
            });
    });
    res.status(201).json({
        message:"post order succed",
        orderTotal:req.orderHeader.total,
        forderTotal:'Rp ' + new Intl.NumberFormat().format(req.orderHeader.total),
        status:201,
    });

}

module.exports = OrderDetailPost;