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
                address:req.body.address,
            })
            .exec()
            .then(updateResult=>{
                Profile.findOne({user_id:ids})
                .exec()
                .then(findResult=>{
                    req.profile = findResult;
                    next();
                })
                .catch(err => {
                    // console.log(err);
                    res.status(500).json({
                      error: err, status:500
                    });
                  });
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
                address:req.body.address,
            })
            .save()
            //.exec()
            .then(createResult=>{
                req.profile = createResult;
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