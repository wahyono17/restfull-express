const Basket = require('../../models/basketItem')

const removeBasket = (result)=>{
    Basket.deleteOne({_id:result._id})
    .exec()
}

module.exports = removeBasket