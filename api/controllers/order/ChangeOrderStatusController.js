const OrderHeader = require('../../models/orderHeader');

const updateOrderStatus = (req,res,next)=>{
    const id = req.body.order_id
    OrderHeader.updateOne({ _id: id }, {
        order_status_id : req.body._id
    })
    .exec()
    .then()
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err, status: 500
        });
    });

    next();
}

module.exports = updateOrderStatus;

