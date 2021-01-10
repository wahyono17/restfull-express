const orderStatusResource = (req,res,next)=>{
    if(req.body.code == 2){
        res.status(201).json({
            message:"pesanan dibatalkan",
            status:201,
        });
    }
    else if(req.body.code == 3){
        res.status(201).json({
            message:"pembayaran succed",
            status:201,
        });
    }
    else if(req.body.code == 4){
        res.status(201).json({
            message:"konfirmasi pesanan berhasil",
            status:201,
        });
    }
    else if(req.body.code == 5){
        res.status(201).json({
            message:"konfirmasi barang siap diambil",
            status:201,
        });
    }
    else if(req.body.code == 6){
        res.status(201).json({
            message:"pesanan selesai",
            status:201,
        });
    }
}

module.exports = orderStatusResource;