const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product_id:{type:mongoose.Types.ObjectId,ref:'Product',required:true},
    transaction_type:{type:String,required:true},
    quantity: {type:Number, require:true},
});

module.exports = mongoose.model('ProductQuantity', productSchema);