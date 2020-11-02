const { check, validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Basket = require("../../models/basketHeader");

exports.validate = (method) => {
    switch (method) {
      case 'postBasket': {
       return [ 
        check('store_id').isLength({min:1}),
        check('product_id').isLength({min:1}),
        check('quantity').isLength({min:1}),
         ]   
      }
    }
  }

exports.BasketHeader = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }    
    //selesai validasi    

    Basket.findOne({user_id:req.userData.userId, store_id:req.body.store_id})
    .exec()
    .then(result=>{
        //jika tidak ditemukan maka tulis baru, jika tidak maka berarti 1 header di pakai banyak item
        if(!result){
            const basket = new Basket({
                _id:mongoose.Types.ObjectId(),
                user_id:req.userData.userId, //ambil dari auth
                store_id:req.body.store_id,
            });
            basket.save()
            .then(header=>{
                req.headerId = header._id;
                next();
                //next post basket item
            })
            .catch()
        }else{
            req.headerId = result._id;
            next();
            //next post basket item
        }
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

//module.exports = BasketHeader;