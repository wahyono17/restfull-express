const Basket = require("../../models/basket");
const removeService = require("../basket/RemoveByIdService");

const OrderPost = (req,res,next)=>{
    req.body.forEach(element => {
        Basket.findById(element.id)
        .exec()
        .then(result=>{
            //req.basket = result;
            removeService(result);
        })
        .catch(Error)

    });
    res.send('ok');
}

module.exports = OrderPost