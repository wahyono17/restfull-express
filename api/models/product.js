const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id:{type:mongoose.Types.ObjectId,ref:'User',required:true},
    name: {type:String, require:true},
    description:{type:String, require:true},
    unit:{type:String, require:true},
    price: {type:Number, require:true},
    productImage: { type: String, required: true }
});

module.exports = mongoose.model('Product', productSchema);