const myBasketResource = (req,res,next)=>{

    let arrayResult = [];
    req.basket.forEach(element => {
        let arrayItem =[];

        element.basketItem[0].forEach(item=>{
            arrayItem.push({
                product_id:item.product_id,
                quantity:item.quantity,
                product_name:item.product_name,
                description:item.description,
                unit:item.unit,
                price:item.price,
                fprice:'Rp ' + new Intl.NumberFormat().format(item.price),
                amount:item.amount,
                famount:'Rp ' + new Intl.NumberFormat().format(item.amount),
            });
        });

        arrayResult.push({
            _id:element._id,
            store_id:element.store_id,
            store_name:element.profile.name,
            total:element.total,
            ftotal:'Rp ' + new Intl.NumberFormat().format(element.total),
            basketItem:arrayItem,
        });
    });
    res.status(201).json({
        data:arrayResult,
        status : 201,
    })
}

module.exports = myBasketResource;

