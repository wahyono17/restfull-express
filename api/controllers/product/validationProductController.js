const Product = require("../../models/product");

exports.findName = (req,res,next)=>{
    const arrayText = [
        {column:req.body.name, show:"nama"},
        {column:req.body.price, show:"harga"},
        {column:req.body.unit, show:"unit"},
        {column:req.body.quantity, show:"jumlah"},
    ];
    arrayText.forEach(element => {
        if(element.column==""){
            res.status(400).json({
                error:`${element.show} tidak boleh kosong`, status:400
            });
        }
    });

    const arrayForNumber = [
        {column:req.body.price, show:"harga"},
        {column:req.body.quantity, show:"jumlah"},
    ];
    arrayForNumber.forEach(element=>{
        if( !(element.column >0) ){
            res.status(400).json({
                error:`${element.show} harus angka`, status:400
            });
        }
    });

    res.send("ok");

    const ids = req.userData.userId;
    Product.findOne({user_id:ids,name:req.body.name})
        .exec()
        .then(result=>{
            if(result){
                res.status(401).json({
                    error: "sudah ada nama yang sama untuk product", status:401
                })
            }else{
                next();
            }
        })
        .catch(err => {
            res.status(500).json({
              error: err, status:500, message:"error validation product"
            });
        });
}