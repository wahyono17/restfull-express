const mongoose = require("mongoose");
const OrderStatus = require("../../models/orderStatus");

const orderStatus = (req, res, next) => {

  const orderStatus = new OrderStatus({
    _id: new mongoose.Types.ObjectId(),
    order_id:req.body.order_id,
    code:req.body.code,
    date:Date.now(),
  });

  orderStatus
    .save()
    .then(result => {
      req.body = result;
      next();

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err, status:500
      });
    });

}

module.exports = orderStatus;