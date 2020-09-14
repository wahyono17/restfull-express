const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product_id:{type:mongoose.Types.ObjectId,ref:'Product',required:true},
    order_id:{type:mongoose.Types.ObjectId,ref:'Order'},
    transaction_type:{type:String,required:true},
    quantity: {type:Number, require:true},
});

module.exports = mongoose.model('ProductQuantity', productSchema);