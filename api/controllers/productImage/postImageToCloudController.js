const uploadImage = require('../../service/upload_storage');

module.exports = (req,res,next)=>{
    // res.send(req.files);
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
}