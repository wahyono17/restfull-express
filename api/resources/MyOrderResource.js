const MyOrderResource = (req,res,next)=>{
    // let lang = req.params.lang;
    let arrayResult = [];
    req.order.forEach(element => {
        let arrayItem =[];

        element.orderitem.forEach(item=>{
            arrayItem.push({
                _id:item._id,
                product_id:item.product_id,
                product_name:item.product_name,
                description:item.description,
                unit:item.unit,
                price:item.price,
                fprice:'Rp ' + new Intl.NumberFormat().format(item.price),
                quantity:item.quantity,
                amount:item.amount,
                fprice:'Rp ' + new Intl.NumberFormat().format(item.amount),
            });
        });

        arrayResult.push({
            _id:element._id,
            user_id:element.user_id,
            date:element.date,
            store_id:element.store_id,
            store_name:element.profile[0].name,
            store_address:element.profile[0].address,
            total:element.total,
            ftotal:'Rp ' + new Intl.NumberFormat().format(element.total),
            order_status_code:element.orderstatus.code,
            order_status_description:element.orderstatus.description,
            order_item:arrayItem,
        });
    });
    res.status(201).json({
        data:arrayResult,
        status : 200,
    })
}

module.exports = MyOrderResource;