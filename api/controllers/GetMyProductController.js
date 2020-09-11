const mongoose = require("mongoose");
const Product = require("../models/product");

const myProduct = (req,res,next)=>{
    //Product.find({user_id:req.userData.userId})
      //.select("name description unit price productImage _id")
      //.populate('productQty')
      //.populate('ProductQty',['quantity'])
      /*
      .aggregate.lookup({
        from:'productqties',localField:'product_id',foreignField:'_id',as:'productqty'
      })
      */
      Product.aggregate([
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
        res.send(docs);
        //console.log(docs);
        /*
        const response = {
          data:docs,
          status:200,
        }
        res.status(200).json(response);
        */

        //req.product = docs;
        //next();
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err, status:500
        });
      });
}

module.exports = myProduct;