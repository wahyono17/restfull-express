const myBasketResource = (req,res,next)=>{

    let arrayResult = [];
    req.basket.forEach(element => {
        let arrayItem =[];
        let total=0;
        element.basket_item.forEach(item=>{
            arrayItem.push({
                product_id:item.product_id,
                quantity:item.quantity,
                product_name:item.product_name[0].name,
                description:item.product_name[0].description,
                unit:item.product_name[0].unit,
                price:item.product_name[0].price,
                fprice:'Rp ' + new Intl.NumberFormat().format(item.product_name[0].price),
                amount:item.quantity * item.product_name[0].price,
                famount:'Rp ' + new Intl.NumberFormat().format(item.quantity * item.product_name[0].price),
            });
            total += item.quantity * item.product_name[0].price;
        });
        arrayResult.push({
            _id:element._id,
            store_id:element.user_product_id,
            store_name:element.profile[0].name,
            total:total,
            ftotal:'Rp ' + new Intl.NumberFormat().format(total),
            basket_item:arrayItem,
        });
    });
    res.status(201).json({
        data:arrayResult,
        status : 201,
    })
}

module.exports = myBasketResource;