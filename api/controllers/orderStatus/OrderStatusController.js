const mongoose = require("mongoose");
const OrderStatus = require("../../models/orderStatus");

const orderStatus = (req, res, next) => {
  if(req.body.code == 2){
    var statusDesc = "dibatalkan"
  }else if(req.body.code == 3){
    var statusDesc = "dibayar"
  }else if(req.body.code == 4){
    var statusDesc = "dikonfirmasi"
  }else if(req.body.code == 5){
    var statusDesc = "siap diambil"
  }else if(req.body.code == 6){
    var statusDesc = "selesai"
  }

  const orderStatus = new OrderStatus({
    _id: new mongoose.Types.ObjectId(),
    order_id:req.body.order_id,
    code:req.body.code,
    description: statusDesc,
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