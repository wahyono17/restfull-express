const removeImage = require('../../service/remove_image');

module.exports = (req,res,next)=>{
    //jika ada gambar yang dikirim maka bisa di hapus, jika tidak maka itu edit tanpa kirim gambar
    const arrayPicture = req.files;
    if( arrayPicture.length >0 ){
      // res.send(req.picture);
      removeImage(req.picture)
        .then(result=>{
            // res.send(result);
            next();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err, status:500, message:"unlink unsucced"
            });
          })
    }else{
      next();
    }
}