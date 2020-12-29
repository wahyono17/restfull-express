const Profile = require("../../models/profile");
const mongoose = require('mongoose');

const myProfile = (req,res,next)=>{
    const ids = req.userData.userId;
    Profile.aggregate([
      {
        $match:{
            user_id:new mongoose.Types.ObjectId(ids)
        }
      },
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
      req.profile = result[0];
      next();
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err, status:500, message:"list profile fail"
        });
      });
}

module.exports =  myProfile;