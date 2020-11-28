const mongoose = require("mongoose");
const Product = require("../../models/product");

const productPatch = (req, res, next) => {
    const id = req.params.productId;

    //ini jika tidak ada gambar baru maka memakai gambar yang ada didatabase, jika ada maka ambil yang baru
    let newImage;
      if(req.file){
        newImage = req.file.filename;
      }else{
        newImage = req.currentProduct.productImage;
      }

    Product.updateOne({ _id: id }, {
      name:req.body.name,
      description:req.body.description,
      unit:req.body.unit,
      price:req.body.price,
      productImage:newImage,
    })
      .exec()
      .then(result => {
        Product.aggregate([
            {
              $match:{
                  _id:new mongoose.Types.ObjectId(id)
              }
            },
            {
              $lookup:{
                from:"productquantities",
                localField:"_id",
                foreignField:"product_id",
                as: "quantity_docs"
              }
            }
          ])
          .exec()
          .then(docs=>{
            //res.send(docs);

            req.product = docs;
            next();
          })
          .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err, status:500
            });
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err, status: 500
        });
      });
}

module.exports = productPatch;