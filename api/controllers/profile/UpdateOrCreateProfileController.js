const Profile = require("../../models/profile");
const mongoose = require('mongoose');
const { count } = require("../../models/profile");

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
                .catch()
            })
            .catch()
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
            .catch()
        }
    })
    .catch()

}

module.exports =  postProfile;