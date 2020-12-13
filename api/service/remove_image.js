const fs = require('fs');

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

module.exports = removeImage