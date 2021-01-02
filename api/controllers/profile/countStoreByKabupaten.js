const Profile = require("../../models/profile");
const mongoose = require('mongoose');

module.exports = (req,res,next)=>{
    const ids = req.userData.userId;
    const kabupatenId = req.params.kabupatenId;
    Profile.aggregate([
    {
        $match:{
            user_id:{$ne:[new mongoose.Types.ObjectId(ids)]}
        }
    },
    {
        $lookup:{
            from:"kecamatans",
            localField:"kecamatan_id",
            foreignField:"id",
            as: "kecamatan"
          }
    },
    {
        $unwind:{
            path: "$kecamatan",
            preserveNullAndEmptyArrays: false
        }
    },
    {
        $match:{
            'kecamatan.kabupaten_id':kabupatenId
        }
    },
    {
        $count: "totalData"
    }
    ])
    .exec()
    .then(result=>{
        req.totaldata =  result[0]['totalData'];
        next();
    })
    .catch(err => {
        // console.log(err);
        res.status(500).json({
          error: err, status:500, message:"count store by kabupaten fail"
        });
    });
}