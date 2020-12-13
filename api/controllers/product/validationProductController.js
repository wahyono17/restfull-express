const Product = require("../../models/product");

exports.findName = (req,res,next)=>{
    if(req.body.name =="" || req.body.price =="" || req.body.unit =="" || req.body.quantity ==""){
        res.status(400).json({
            error:"nama,harga,unit,jumlah tidak boleh kosong"
        });
    }

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