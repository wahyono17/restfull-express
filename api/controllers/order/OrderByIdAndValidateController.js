const OrderHeader = require('../../models/orderHeader');
const mongoose = require('mongoose');

const findOrderHeader = (req,res,next)=>{
    const orderId = req.body.order_id;
    OrderHeader.aggregate([
        {
            $match:{
                _id : new mongoose.Types.ObjectId(orderId)
            }
        },
        {
            $lookup:{
                from:"orderstatuses",
                localField:"order_status_id",
                foreignField:"_id",
                as:"orderstatus"
            }
        },
    ])
    .exec()
    .then(result=>{
        //jika tidak ada
        if(result.length == 0){
            return res.status(404).json({
                message: "Pesan tidak ditemukan",
                status:404,
            });
        }else{
            req.orderHeader = result[0];
            //cancel bisa di lakukan oleh penjual dan pembeli
            if(req.body.code == 2){
                if(result[0].user_id != req.userData.userId){ //jika bukan pembeli
                    if(result[0].store_id != req.userData.userId){ //jika bukan penjual
                        return res.status(401).json({
                            message: "Anda tidak diijinkan",
                            status:401,
                            });
                    }
                }
                next();
            }

            //pembayaran status 3 hanya bisa oleh admin, sementara saja
            if(req.body.code == 3){
                if(req.userData.admin == 1){
                    if(result[0].orderstatus[0].code == 1){
                        next();
                    }else{
                        return res.status(401).json({
                            message: "transaksi ini tidak diijinkan untuk konfirmasi pembayaran",
                            status:401,
                            });
                    }

                }else{
                    return res.status(401).json({
                        message: "Anda tidak diijinkan konfirmasi pembayaran",
                        status:401,
                        });
                }
            }

            //diproses(4) hanya oleh penjual
            if(req.body.code == 4){
                if(result[0].store_id == req.userData.userId){ //diproses oleh penjual
                    //jika statusnya sudah 3 sudah dibayar
                    // console.log(result[0]);
                    if(result[0].orderstatus[0].code == 3){
                        next();
                    }else{
                        return res.status(401).json({
                            message: "hanya yang sudah dibayar yang diijinkan untuk dikonfirmasi",
                            status:401,
                            });
                    }
                }else{
                    return res.status(401).json({
                        message: "Anda tidak diijinkan proses penjualan",
                        status:401,
                        });
                }
            }

            //barang siap diambil 5
            if(req.body.code == 5){
                //hanya bisa oleh penjual
                if(result[0].store_id == req.userData.userId){
                    //jika statusnya sudah 4
                    if(result[0].orderstatus[0].code == 4){
                        next();
                    }else{
                        return res.status(401).json({
                            message: "hanya yang sudah diproses yang diijinkan untuk konfirmasi siap diambil",
                            status:401,
                            });
                    }
                }else{
                    return res.status(401).json({
                        message: "Anda tidak diijinkan konformasi siap ambil",
                        status:401,
                        });
                }
            }

            //barang sudah di ambil 6
            if(req.body.code == 6){
                //hanya oleh pembeli
                if(result[0].user_id == req.userData.userId){
                    if(result[0].orderstatus[0].code == 5){
                        next();
                    }else{
                        return res.status(401).json({
                            message: "hanya yang sudah siap diambil, bisa konfirmasi sudah diambil",
                            status:401,
                            });
                    }
                }else{
                    return res.status(401).json({
                        message: "Anda tidak diijinkan konformasi sudah diambil",
                        status:401,
                        });
                }
            }
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
        error: err, status: 500
        });
    });
}

module.exports = findOrderHeader;
