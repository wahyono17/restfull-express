const ProductQty = require("../../models/productQuantity");
const orderitem = require('../../models/orderItem');

module.exports = (req,res,next)=>{
    ProductQty.find({order_id:req.body.order_id,transaction_type:3}).deleteMany()
        .exec()
        .then(result=>{
            console.log(result);
            res.send(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })

}

// module.exports = (req,res,next)=>{
//     orderitem.find({order_id:req.body.order_id})
//         .exec().then(result=>res.send(result))
// }