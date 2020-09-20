const profileResource = (req,res,next)=>{
    //console.log(req.profile);
    res.status(201).json({
        data:{
            _id: req.profile._id,
            user_id: req.profile.user_id,
            name: req.profile.name,
            mobile: req.profile.mobile,
            address: req.profile.address,
        },
        status : 201,
    })
}

module.exports = profileResource;