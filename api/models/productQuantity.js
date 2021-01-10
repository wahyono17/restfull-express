const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product_id:{type:mongoose.Types.ObjectId,ref:'Product',required:true},
    order_id:{type:mongoose.Types.ObjectId,ref:'Order'},
    transaction_type:{type:Number,required:true},
    quantity: {type:Number, require:true},
    date:{type:Date, default:Date.now()},
});

module.exports = mongoose.model('ProductQuantity', productSchema);