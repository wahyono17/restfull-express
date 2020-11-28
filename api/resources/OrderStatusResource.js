const orderStatusResource = (req,res,next)=>{
    if(req.body.code == 2){
        res.status(201).json({
            message:"pesan dibatalkan",
            status:201,
        });
    }
}

module.exports = orderStatusResource;