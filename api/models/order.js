const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date:{type:Date,required:true},
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },//ref ke product model
    price:{type:Number},
    quantity: { type: Number, default: 1 },
    amount:{type:Number, default :1},
    ordered_by: {type:mongoose.Types.ObjectId,ref:'User',required:true},
    status_code:{type:Number, ref:'OrderStatus',required:true},
    note:{type:String},
});

module.exports = mongoose.model('Order', orderSchema);