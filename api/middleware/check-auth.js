const jwt = require('jsonwebtoken');
const User = require("../models/user");
let moment = require('moment'); // require

// module.exports = (req, res, next) => {
//     try {
//         const token = req.headers.authorization.split(" ")[1];
//         // req.test = token;
//         const decoded = jwt.verify(token, process.env.JWT_KEY);
//         //console.log(decoded);
//         req.userData = decoded;
//         //exports.userData = decoded;

//         //disini harus di tambahi rule untuk cek password apakah masih sama atau tidak, sebelum dikirim ke next
//         next();
//     } catch (error) {
//         return res.status(401).json({
//             message: 'Auth failed'
//         });
//     }
// };

module.exports = (req,res,next) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;

    User.findById(decoded.userId).exec()
        .then(result=>{
            let tokendate = moment(req.userData.date);
            let userdate = moment(result.date);

            if(!result){
                res.status(400).json({
                    error:"user tidak ditemukan", status:400
                });
            }else if(result){
                //jika tanggal token lebih kecil dari tanggal di user artinya sudah terjadi perubahan password, harus login ulang
                if(tokendate < userdate){
                    res.status(400).json({
                        error:"password tidak tepat, harap perbaharui", status:400
                    });
                }else{
                    next();
                }
            }
        })
        .catch(err => {
            console.log(err);
                res.status(500).json({
            error: err, message:"error on find userid checkauth"
            });
        });
}