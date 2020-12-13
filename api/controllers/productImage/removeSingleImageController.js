const ProductImage = require("../../models/productImage");

const removeSingleImage = (req,res,next)=>{
    const id = req.params.id;

    ProductImage.findByIdAndRemove(id)
        .exec()
        .then(result=>{
            res.status(200).json({
                status:200, message:"hapus gambar berhasil"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err, status:500, message:"gagal hapus gambar"
            });
        });
}

module.exports = removeSingleImage;