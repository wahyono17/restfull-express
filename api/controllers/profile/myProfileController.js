const Profile = require("../../models/profile");
//const mongoose = require('mongoose');

const myProfile = (req,res,next)=>{
    const ids = req.userData.userId;
    Profile.findOne({user_id:ids})
    .exec()
    .then(result=>{
        res.status(200).json({
            data: result,
            status : 200,
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err, status:500
        });
      });
}

module.exports =  myProfile;