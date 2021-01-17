const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");


module.exports = (req,res,next)=>{
    const id = req.userData.userId;

    //password harus diisi
    if(req.body.password == ""){
        res.status(400).json({
            error: "password tidak boleh kosong", status:400
        });
    }

    User.findById(id)
    .exec()
    .then(user=>{
        // res.send(user);
        // console.log(user);
        if(user == null){
            return res.status(401).json({
                message: "Auth failed"
              });
        }else{
           //angka 10 adalah untuk membuat random string sebelum di hash, mengurangi kemungkinan di hack
          //(err, hash) //callback pertama adalah error sudah default dari library, yang kedua adalah hasil
          bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
                User.updateOne({ _id: id },{
                    password:hash,
                    admin:req.body.admin ? 1 : 0,
                    date:Date.now(),
                })
                .exec()
                .then(result => {
                    res.status(200).json({
                    message:"rubah berhasil",status:200
                    });
                })
                .catch(err => {
                    // console.log(err);
                    res.status(500).json({
                    error: err, status: 500, message:"rubah gagal"
                    });
                });
            }
          });
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err, message:"user id not found"
        });
    });
}