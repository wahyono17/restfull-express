const Kabupaten = require("../../models/kabupaten");

module.exports = (req,res,next)=>{
    const provinsi_id = req.profile.kecamatan[0] ? req.profile.kecamatan[0].provinsi_id : null;
    if(provinsi_id == null){
        res.status(401).json({
            message : 'Lengkapi dulu profile anda',
            status:401,
        });
    }
    // const provinsi_id = req.params.provinsiId;
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