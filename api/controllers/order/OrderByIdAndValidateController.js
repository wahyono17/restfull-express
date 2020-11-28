const OrderHeader = require('../../models/orderHeader');

const findOrderHeader = (req,res,next)=>{
    OrderHeader.findById(req.body.order_id)
    .exec()
    .then(order=>{
        if (!order) {
            return res.status(404).json({
            message: "Pesan tidak ditemukan",
            status:404,
            });
        }else{
            if(order.user_id != req.userData.userId){
                return res.status(401).json({
                    message: "Anda tidak diijinkan",
                    status:401,
                    });
            }else{
                next()//next ke update status order
            }
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
        error: err, status: 500
        });
    });
}

module.exports = findOrderHeader;
