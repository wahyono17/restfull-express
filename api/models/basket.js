const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    user_product_id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 },
});

module.exports = mongoose.model('Basket', orderSchema);