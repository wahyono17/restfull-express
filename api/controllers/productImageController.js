const mongoose = require("mongoose");
const ProductImage = require("../models/productImage");

const postImage = (req,res,next)=>{
    const productImage = new ProductImage({
        _id: new mongoose.Types.ObjectId(),
        product_id : req.product._id,
        filename : req.file.filename,
    });

    productImage
        .save()
        .then(result=>{
            res.status(201).json({
                data:{
                    name: req.product.name,
                    description:req.product.description,
                    unit:req.product.unit,
                    price: req.product.price,
                    _id: req.product._id,
                    productImage:result,
                }
            })
            //next();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err, status:500
            });
        });
}

module.exports = postImage;