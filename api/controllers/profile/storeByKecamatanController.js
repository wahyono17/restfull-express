const Profile = require("../../models/profile");
const mongoose = require('mongoose');

module.exports = (req,res,next)=>{
    const ids = req.userData.userId;
    const kecamatanId = req.params.kecamatanId;
    const limit = req.query.limit ? req.query.limit:15 ;
    const page = req.query.page ? req.query.page:1 ;
    const skip = limit * (page -1);
    Profile.aggregate([
    {
        $match:{
            user_id:{$ne:[new mongoose.Types.ObjectId(ids)]},
            kecamatan_id:kecamatanId
        }
    },
    {$limit:limit + skip},
    {$skip:skip},
    {
        $lookup:{
            from:"kecamatans",
            localField:"kecamatan_id",
            foreignField:"id",
            as: "kecamatan"
          }
    }
    ])
    .exec()
    .then(result=>{
        // res.send(result);
        req.profiles = result;
        next();
    })
    .catch(err => {
        // console.log(err);
        res.status(500).json({
          error: err, status:500, message:"list store by kecamatan fail"
        });
    });
}