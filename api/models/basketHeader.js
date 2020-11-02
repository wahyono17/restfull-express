const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    store_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    total:{type:Number},
    note:{type:String},
});

module.exports = mongoose.model('BasketHeader', orderSchema);