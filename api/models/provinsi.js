const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    id: {type:String},
    name:{type:String},
});

module.exports = mongoose.model('Provinsi', orderSchema);