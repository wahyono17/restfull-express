const Basket = require('../../models/basket')

const removeBasket = (result)=>{
    //console.log(result);
    //id = req.basket._id;
    Basket.deleteOne({_id:result._id})
    .exec()
    .then(result=>{
        //console.log(result);
    })
    .catch()
}

module.exports = removeBasket