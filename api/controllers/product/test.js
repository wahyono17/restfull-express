const mongoose = require("mongoose");
const Product = require("../../models/product");

module.exports=(req,res,next)=>{
    let arr = [
        {coba:123,
        nama:"wahyono" }
        ,{coba:456,
        nama:"maria"}
    ];
    console.log(arr[0].coba);
    res.send(arr[0]);

    // Product.find()
    // .exec()
    // .then(result=>{
    //     res.send(result[0]);
    // })
    // .catch
}