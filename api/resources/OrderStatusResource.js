const orderPostResource = (req,res,next)=>{
    res.send(req.body);
    /*
    res.status(201).json({
        data:{
            _id: req.order._id,
            date:req.order.date,
            product_id:req.order.product_id,
            product_name:req.product.name,
            quantity:req.order.quantity,
            price:req.order.price,
            fprice:'Rp ' + new Intl.NumberFormat().format(req.order.price),
            amount:req.order.amount,
            famount:'Rp ' + new Intl.NumberFormat().format(req.order.amount),
            status_code:req.order.status_code,
            status_description:req.orderStatus.description,
            note:req.order.note
        },
        status:201,
        error:0,
    })
    */
}

module.exports = orderPostResource;