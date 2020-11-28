const productResource = (req,res,next)=>{
    res.status(201).json({
        data:{
            _id: req.product._id,
            name: req.product.name,
            description:req.product.description,
            unit:req.product.unit,
            quantity:req.productQty.quantity,
            price: req.product.price,
            fprice:'Rp ' + new Intl.NumberFormat().format(req.product.price),
        },
        status : 201
    })
}

module.exports = productResource;

/*
productImage:req.image.map(function(Element){
                return {
                    filename : Element.filename
                }
            }),
*/