const mongoose = require("mongoose");
const orderItem = require('../../models/orderItem');
const ProductQty = require("../../models/productQuantity");

module.exports = (req,res,next) =>{
    //berlaku untuk status yang dikirim 2 dan 4 saja, selain itu lewati saja
    if(req.body.code == 2 || req.body.code == 4){
        orderItem.find({order_id:req.body.order_id})
        .exec()
        .then(result=>{
            if(result.length > 0){
                //jika status yang dikirim 4 maka lihat order detail, looping dan post - di product quantity
                if(req.body.code == 4){
                    result.forEach(element=>{
                        const productQty = new ProductQty({
                            _id: new mongoose.Types.ObjectId(),
                            product_id:element.product_id,
                            order_id:req.body.order_id,
                            transaction_type:3, //order
                            quantity:element.quantity * -1, //kalikan munis 1 karena mengurangi stock order
                        });
                        productQty
                            .save()
                            .then(result => {
                                next();
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err, status:500, message:"save product quantity fail"
                                });
                            });
                    })
                }

                //jika yang di kirim 2 dan result.orderStatus >= 4 maka hapus yang telah di post di product quantity
                if(req.body.code == 2){
                    if(req.orderHeader.orderstatus[0].code >= 4){
                        //cari di productQuantity dengan order id yang dikirim jika ketemu maka di hapus
                        ProductQty.find({order_id:req.body.order_id,transaction_type:3}).deleteMany()
                            .exec()
                            .then(result=>{
                                // console.log(result);
                                // next();
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err, status:500, message:"find orderQuantity after cancel fail"
                                });
                            })

                        next();
                    }else{
                        next();
                    }
                }
            }else{
                res.status(500).json({
                    error:"data tidak ditemukan", status:500
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err, status: 500, message:"find order item fail"
            });
        })
    }else{
        next();
    }

}


