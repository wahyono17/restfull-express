const Basket = require("../../models/basketHeader");

//const RemoveByIdService = require("../../service/basket/RemoveByIdService");

const OrderPost = (req,res,next)=>{
    req.body.forEach(element => {
        Basket.findById(element.id)
        .exec()
        .then(result=>{
            //post ke order, kelompokan berdasarkan user_product_id

            //remove basket
            //RemoveByIdService(result).then(removeResult=>{

            //})

        })
        .catch(err => {
            res.status(500).json({
              error: err, status:500
            });
        })

    });
    res.send('ok');
}

module.exports = OrderPost