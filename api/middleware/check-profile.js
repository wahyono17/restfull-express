const Profile = require('../models/profile')
const mongoose = require('mongoose');

//ini untuk cek profile jika sudah ada profile bisa lanjut ke next step
module.exports = (req,res,next)=>{
    const ids = new mongoose.Types.ObjectId(req.userData.userId);

    Profile.findOne({user_id:ids})
    .exec()
    .then(result=>{
        if(result){
            next();
        }else{
            res.status(401).json({
                message : 'Lengkapi dulu profile anda',
                status:401,
            });
        }
    })
    .catch(err => {
        //console.log(err);
        res.status(500).json({
          error: err, status:500
        });
      });
}