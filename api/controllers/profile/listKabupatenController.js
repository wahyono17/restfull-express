const Kabupaten = require("../../models/kabupaten");

module.exports = (req,res,next)=>{
    const provinsi_id = req.params.provinsiId;
    Kabupaten.find({provinsi_id:provinsi_id})
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
          error: err, status:500, message:"list all kabupaten fail"
        });
    });
}