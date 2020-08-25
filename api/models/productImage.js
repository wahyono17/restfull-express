const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product_id:{type:mongoose.Types.ObjectId,ref:'Product',required:true},
    filename: {type:String, require:true},
});

module.exports = mongoose.model('ProductImage', productSchema);