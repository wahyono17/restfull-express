const profileResource = (req,res,next)=>{
    //console.log(req.profile);
    res.status(201).json({
        data:{
            _id: req.profile._id,
            user_id: req.profile.user_id,
            name: req.profile.name,
            mobile: req.profile.mobile,
            address: req.profile.address,
            provinsi_id: req.profile.kecamatan[0] ? req.profile.kecamatan[0].provinsi_id : null,
            kabupaten_id: req.profile.kecamatan[0] ? req.profile.kecamatan[0].kabupaten_id : null,
            kecamatan_id : req.profile.kecamatan_id,
            kecamatan_name : req.profile.kecamatan[0] ? req.profile.kecamatan[0].name : null,
        },
        status : 200,
    })
}

module.exports = profileResource;