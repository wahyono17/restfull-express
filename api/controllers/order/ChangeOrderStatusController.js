const orderHeader = require('../../models/orderHeader');
// const mongoose = require('mongoose');
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

    next();//next langsung kirim pesan json dengan code awal yang dikirim, jika 2 cancel dan seterusnya
}

module.exports = updateOrderStatus;

