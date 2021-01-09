const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);//ini untuk menghilangkan warning

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
        unique: true,
        //match adalah email regex, silahkan googling akan dpt di stackoverflow
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    date:{type:Date},
    admin:{type: Number, default: 0}
});

module.exports = mongoose.model('User', userSchema);