const allProductResource = (req,res,next)=>{

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
        status : 200,
    })
}

module.exports = allProductResource;