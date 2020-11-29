const allProductResource = (req,res,next)=>{
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

        arrayResult.push({
            _id:element._id,
            store_id:element.profile[0].user_id,
            store_name:element.profile[0].name,
            name:element.name,
            description:element.description,
            unit:element.unit,
            price:element.price,
            fprice:'Rp ' + new Intl.NumberFormat().format(element.price),
            quantity:balanceProduct,
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

module.exports = allProductResource;