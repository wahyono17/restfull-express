const mongoose = require("mongoose");
const ProductImage = require("../../models/productImage");

const postImage = (req,res,next)=>{
    // console.log(req.files);
    if(req.files.length > 0){
        let arrayImage = [];
        req.files.forEach(element => {
            productImage = new ProductImage({
                _id: new mongoose.Types.ObjectId(),
                product_id : req.product._id,
                filename : element.filename,
            });
            arrayImage.push(productImage);
        });

        ProductImage.insertMany(arrayImage,(erros,doct)=>{
            req.image = doct;
            next();
        })
    }else{
        next();
    }

}

module.exports = postImage;