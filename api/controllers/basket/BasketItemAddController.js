const mongoose = require("mongoose");
const BasketItem = require("../../models/basketItem");
const Product = require('../../models/product');
const Basket = require('../../models/basketHeader');

const BasketAdd = (req, res, next) => {
    //save basket item berdasarkan product untuk ambil price
    Product.findById(req.body.product_id)
        .exec()
        .then(product=>{
            const basket = new BasketItem({
                _id:mongoose.Types.ObjectId(),
                header_id:req.headerId,
                product_id:req.body.product_id,
                product_name:product.name,
                description:product.description,
                price:product.price,
                unit:product.unit,
                quantity:req.body.quantity,
                amount:product.price * req.body.quantity,
            });
            basket.save()
            .then(basketItemSave=>{
                //***************setelah save berhasil maka update total yang ada di basket header*/
                Basket.findById(basketItemSave.header_id)
                    .exec()
                    .then(basketResult=>{
                        let total = basketResult.total ? basketResult.total : 0 ;
                        Basket.updateOne({_id:basketItemSave.header_id},{
                            total: total + basketItemSave.amount
                        })
                            .exec()
                            .then(basketUpdate=>{
                                res.status(201).json({
                                    message:"post succed",
                                    status:201,
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                });
                            });
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
                /********************************* */

            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

}

module.exports = BasketAdd;