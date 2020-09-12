const mongoose = require("mongoose");
const OrderStatus = require("../models/orderStatus");

const orderStatusPost = (req, res, next) => {
    const orderStatus = new OrderStatus({
      _id: new mongoose.Types.ObjectId(),
      order_id:req.order._id,
      code:1,//code 1 karena opening order
      description:"barang di order",
      date:Date.now(),
    });

    orderStatus
      .save()
      .then(result => {
        req.orderStatus = result;
        next();

      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err, status:500
        });
      });
}

module.exports = orderStatusPost;