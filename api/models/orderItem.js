const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    order_id: { type: mongoose.Schema.Types.ObjectId, ref: 'OrderHeader', required: true },
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    product_name: {type:String},
    description:{type:String},
    price:{type: Number, default:1},
    unit:{type:String},
    quantity: { type: Number, default: 1 },
    amount:{ type: Number, default: 1 },

});

module.exports = mongoose.model('OrderItem', orderSchema);