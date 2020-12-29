const Profile = require("../../models/profile");
const mongoose = require("mongoose");

module.exports = (req,res,next)=>{
    const ids = req.userData.userId;
    const kecamatanId = req.params.kecamatanId;
    Profile.countDocuments({
        user_id:{$ne:[new mongoose.Types.ObjectId(ids)]},
        kecamatan_id:kecamatanId
    })
    .exec()
    .then(result=>{
        req.totaldata = result;
        next();
    })
    .catch(err => {
        // console.log(err);
        res.status(500).json({ error: err });
      });
}