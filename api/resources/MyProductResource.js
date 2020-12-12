const myProductResource = (req,res,next)=>{
    const limit = req.query.limit;
    const page = req.query.page;
    let nextpage = 0;
    if(Math.round(req.totaldata / limit) > page){
        nextpage = page + 1;
    }else{
        nextpage = page;
    }

    let arrayResult = [];
    req.product.forEach(element => {
        /*********ini untuk menjumlah array quantity karena ada nilai plus dan minus*/
        let initialValue = 0;
        let arr = element.quantity_docs;
        let balanceProduct = arr.reduce(function(accumulator,curentValue){
            return accumulator + curentValue.quantity;
        },initialValue);
        /******** */

        //console.log(balanceProduct);

        //ini untuk looping gambar
        let arrayImage = [];
        element.image_docs.forEach(image=>{
            const filename = image.filename
            arrayImage.push(
                {_id:image._id,
                filename:`https://storage.googleapis.com/jsimage/${filename}`}
            );
        });

        arrayResult.push({
            _id:element._id,
            name:element.name,
            description:element.description,
            unit:element.unit,
            price:element.price,
            fprice:'Rp ' + new Intl.NumberFormat().format(element.price),
            quantity:balanceProduct,
            image:arrayImage,
        })
    });

    res.status(200).json({
        data:arrayResult,
        curentpage:page,
        perpage:limit,
        nextpage:nextpage,
        totalpage:Math.round(req.totaldata / limit),
        status : 200,
    })
}

module.exports = myProductResource;