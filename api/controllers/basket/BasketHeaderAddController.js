const mongoose = require("mongoose");
const Basket = require("../../models/basketHeader");

const BasketHeader = (req, res, next) => {
    Basket.findOne({user_id:req.userData.userId, user_product_id:req.body.user_product_id})
    .exec()
    .then(result=>{
        //jika tidak ditemukan maka tulisa baru, jika tidak maka berarti 1 header di pakai banyak item
        if(!result){
            const basket = new Basket({
                _id:mongoose.Types.ObjectId(),
                user_id:req.userData.userId, //ambil dari auth
                user_product_id:req.body.user_product_id,
            });
            basket.save()
            .then(header=>{
                req.headerId = header._id;
                next();
            })
            .catch()
        }else{
            req.headerId = result._id;
            next();
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

module.exports = BasketHeader;