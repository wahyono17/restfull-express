const Kecamatan = require("../../models/kecamatan");

module.exports = (req,res,next)=>{
    const kabupaten_id = req.params.kabupatenId;
    Kecamatan.find({kabupaten_id:kabupaten_id})
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
          error: err, status:500, message:"list all kecamatan fail"
        });
    });
}