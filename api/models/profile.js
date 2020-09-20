const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name:{type:String, required:true},
    mobile:{type:String, required:true},
    address:{type:String}
});

module.exports = mongoose.model('Profile', orderSchema);