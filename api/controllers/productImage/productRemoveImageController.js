const mongoose = require("mongoose");
const ProductImage = require("../../models/productImage");

const postImage = (req,res,next)=>{
    const id = req.params.productId;
    const arrayPicture = req.files;
    if( arrayPicture.length > 0){
        //ambil dulu di model apakah ada picture lama, gambar yang diijinkan hanya empat
        //jika yang datang + gambar lama lebih dari 4 maka kelibihan di gambar lama harus dihapus
        ProductImage.find({product_id:id})
        .exec()
        .then(currentImage=>{
            imageToRemove = (currentImage.length + req.files.length) - 4

            if(imageToRemove > 0){
                i = imageToRemove;
                while(i>0){
                    indexArr = i -1;
                    ProductImage.remove({ _id:currentImage[indexArr]["_id"] })
                        .exec()
                        .then()
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                              error: err, status:500, message:"error remove current image"
                            });
                        });
                    i--
                }

                next();
            }

            next();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err, status:500, message:"remove image not succed"
            });
        });
    }else{
        next();
    }

}

module.exports = postImage;