const mongoose = require("mongoose");
const Product = require("../../models/product");

module.exports=(req,res,next)=>{
    Product.find()
    .exec()
    .then(result=>{
        res.send(result[0]);
    })
    .catch
}