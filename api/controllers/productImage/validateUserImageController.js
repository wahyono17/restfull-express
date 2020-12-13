const ProductImage = require("../../models/productImage");

const validateUserImage = (req,res,next)=>{
    const id = req.params.id;

    ProductImage.findById(id)
        .exec()
        .then(result=>{
            if(result){
                //jika ketemu maka yang mengakses adalah pemilik product, maka di ijinkan
                if(result.user_id == req.userData.userId){
                    next();
                }else{
                    res.status(401).json({
                        error:"anda tidak dijinkan melakukan aktivitas ini", status:400
                    });
                }
            }else{
                res.status(400).json({
                    error:"gambar tidak ditemukan", status:400
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err, status:500, message:"gambar tidak ditemukan"
            });
        });
}

module.exports = validateUserImage;