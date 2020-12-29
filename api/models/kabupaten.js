const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    provinsi_id: {type:String},
    id: {type:String},
    name:{type:String},
});

module.exports = mongoose.model('Kabupaten', orderSchema);