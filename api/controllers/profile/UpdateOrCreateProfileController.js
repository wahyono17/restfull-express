const Profile = require("../../models/profile");
const mongoose = require('mongoose');

const postProfile = (req,res,next)=>{
    const ids = new mongoose.Types.ObjectId(req.userData.userId);

    Profile.findOne({user_id:ids})
    .exec()
    .then(result=>{
        //jika di temukan maka updateOne
        if(result){
            Profile.updateOne({user_id:ids},{
                name:req.body.name,
                mobile:req.body.mobile,
                kecamatan_id:req.body.kecamatan_id,
                address:req.body.address,
            })
            .exec()
            .then(result=>{
              next();
            })
            .catch(err => {
                // console.log(err);
                res.status(500).json({
                  error: err, status:500
                });
              });
        }else{
            new Profile({
                _id:mongoose.Types.ObjectId(),
                user_id:ids,
                name:req.body.name,
                mobile:req.body.mobile,
                kecamatan_id:req.body.kecamatan_id,
                address:req.body.address,
            })
            .save()
            //.exec()
            .then(createResult=>{
                next();
            })
            .catch(err => {
                // console.log(err);
                res.status(500).json({
                  error: err, status:500
                });
              });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err, status:500
        });
      });

}

module.exports =  postProfile;