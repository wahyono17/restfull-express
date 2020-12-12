const fs = require('fs');

module.exports = (req,res,next)=>{
    // const arrayPicture = req.picture;
    const removeImage = (arrayPicture)=> new Promise( (resolve,rejects)=>{
        arrayPicture.forEach(element => {
            fs.unlink(element,(err)=>{
                if(err){
                  console.log(err);
                  res.status(500).json({
                    message:"remove data from folder fail",
                    error: err, status:500,
                  });
                }
              });
        });

        const message = "unlink succed"
        resolve(message);
        rejects(err=>(err))
    });

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