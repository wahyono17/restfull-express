module.exports = (req,res,next)=>{
    res.send(req.userData);
}