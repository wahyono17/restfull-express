const Product = require("../../models/product");
const removeImage = require('../../service/remove_image');
const path = require('path');

module.exports = (req,res,next)=>{
    const arrayText = [
        {column:req.body.name, show:"nama"},
        {column:req.body.price, show:"harga"},
        {column:req.body.unit, show:"unit"},
        {column:req.body.quantity, show:"jumlah"},
    ];
    arrayText.forEach(element => {
        if(element.column==""){
            //jika ada gambar yang telah di upload di folder upload maka hapus
            if( req.files.length >0 ){
                let arrayPicture = [];
                req.files.forEach(element => {
                    const {filename} = element;
                    const picture = path.join(__dirname,'../../../uploads',filename);
                    arrayPicture.push(picture);
                });
                removeImage(arrayPicture)
                    .then()
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err, status:500, message:"unlink unsucced"
                        });
                    })
            }
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
            //jika ada gambar yang telah di upload di folder upload maka hapus
            if( req.files.length >0 ){
                let arrayPicture = [];
                req.files.forEach(element => {
                    const {filename} = element;
                    const picture = path.join(__dirname,'../../../uploads',filename);
                    arrayPicture.push(picture);
                });
                removeImage(arrayPicture)
                    .then()
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err, status:500, message:"unlink unsucced"
                        });
                    })
            }
            res.status(400).json({
                error:`${element.show} harus angka`, status:400
            });
        }
    });

    const ids = req.userData.userId;
    Product.findOne({user_id:ids,name:req.body.name})
        .exec()
        .then(result=>{
            if(result){
                //jika ada gambar yang telah di upload di folder upload maka hapus
                if( req.files.length >0 ){
                    let arrayPicture = [];
                    req.files.forEach(element => {
                        const {filename} = element;
                        const picture = path.join(__dirname,'../../../uploads',filename);
                        arrayPicture.push(picture);
                    });
                    removeImage(arrayPicture)
                        .then()
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                error: err, status:500, message:"unlink unsucced"
                            });
                        })
                }
                res.status(400).json({
                    error: "sudah ada nama yang sama untuk product", status:400
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