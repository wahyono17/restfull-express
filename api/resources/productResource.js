const productResource = (req,res,next)=>{
    //ini untuk looping gambar
    let arrayImage = [];
    req.files.forEach(image=>{
        const filename = image.filename
        arrayImage.push({filename:`https://storage.googleapis.com/jsimage/${filename}`});
    });

    res.status(201).json({
        data:{
            _id: req.product._id,
            name: req.product.name,
            description:req.product.description,
            unit:req.product.unit,
            quantity:req.productQty.quantity,
            price: req.product.price,
            fprice:'Rp ' + new Intl.NumberFormat().format(req.product.price),
            image:arrayImage,
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