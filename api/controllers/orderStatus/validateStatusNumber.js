module.exports = (req,res,next) =>{
    //hanya status 2,3,4,5,6 yang diijinkan untuk dimasukan
    const arrayStatus = ["2","3","4","5","6"];
    if(arrayStatus.includes(req.body.code)){
        next();
    }else{
        return res.status(401).json({
            message: "tidak dijinkan",
            status:401,
            });
    }
}