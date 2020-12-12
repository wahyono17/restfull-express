const uploadImage = require('../../service/upload_storage');

module.exports = (req,res,next)=>{
    // res.send(req.files);
    //jika ada gambar yang dikirim maka bisa diupload jika tidak maka itu adalah edit tanpa gambar
    const arrayPicture = req.files;
    if( arrayPicture.length > 0){
      uploadImage(req.files)
        .then(result=>{
            // res.send(result)
            req.picture = result
            next();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
              error: err, status:500
            });
          });

    }else{
      next();
    }
}