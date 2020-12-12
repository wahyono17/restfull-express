const Profile = require("../../models/profile");
const mongoose = require('mongoose');

//cari apakah ada nama yang sama untuk id yang bukan ini, jika ada maka return json error
const findName = (req,res,next)=>{
    const ids = new mongoose.Types.ObjectId(req.userData.userId);

    Profile.findOne({ user_id:{"$nin":[ids]}, name:req.body.name })
    .exec()
    .then(result=>{
        if(result){
            res.status(401).json({
                status:401, message:"sudah ada nama yang sama, gunakan nama lain"
            });
        }else{
            next();
        }
    })
    .catch(err => {
        res.status(500).json({
          error: err, status:500, message:"error validation nama"
        });
    });
}

module.exports =  findName;