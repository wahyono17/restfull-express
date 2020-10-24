const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: {type:mongoose.Types.ObjectId,ref:'User',required:true},
    date:{type:Date,required:true},
    store_id: {type:mongoose.Types.ObjectId,ref:'User',required:true}, //store id adalah dari mana kita beli
    //status_code:{type:Number, ref:'OrderStatus',required:true},
    order_status_id:{type:mongoose.Types.ObjectId,ref:'User'},
    total:{type:Number},
    note:{type:String},
});

module.exports = mongoose.model('OrderHeader', orderSchema);