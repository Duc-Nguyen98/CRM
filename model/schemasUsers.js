const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    avatar: String,
    name: String,
    gender: Number,
    birthDate: Date,
    telephone: String,
    email: String,
    account: String,
    password: String,
    softDelete: Number,
    created:{
        nameCreateAt : String,
        time : Date
    },
    modified:{
        nameUpdateAt : String,
        time : Date
    },
});



module.exports = mongoose.model('users', schema);
