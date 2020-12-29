const Kecamatan = require("../../models/provinsi");

module.exports = (req,res,next)=>{
    Kecamatan.find()
    .select('id name')
    .exec()
    .then(result=>{
        res.status(200).json({
            data:result,
            status:200,
        });
    })
    .catch(err => {
        // console.log(err);
        res.status(500).json({
          error: err, status:500, message:"list all provinsi fail"
        });
    });
}