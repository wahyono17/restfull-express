const myBasketResource = (req,res,next)=>{
    //console.log(req.basket);

    let arrayResult = [];
    req.basket.forEach(element => {
        arrayResult.push({
            _id:element._id,
            to_id:element.user_product_id,
            to_name:element.profile_docs[0].name,
            product_id:element.product_id,
            product_name:element.product_docs[0].name,
            product_description:element.product_docs[0].description,
            unit:element.product_docs[0].unit,
            price:element.product_docs[0].price,
            quantity:element.quantity,
            amount:element.quantity * element.product_docs[0].price,
        });
    });
    res.status(201).json({
        data:arrayResult,
        status : 201,
    })
}

module.exports = myBasketResource;