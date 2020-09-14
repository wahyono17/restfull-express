const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    order_id:{type:mongoose.Types.ObjectId,ref:'Order',required:true},
    code:{type:Number,required:true},
    description:{type:String},
    date:{type:Date},
});

module.exports = mongoose.model('OrderStatus', orderSchema);