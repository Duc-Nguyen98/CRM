const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    customerName:String,
    customerAvatar:{
        type:String,
        default:''
    },
    customerEmail:String,
    customerGender:String, 
    customerDate:Date,
    customerTelephone:String,
    customerJob:String,
    customerAddress:String,
    customerGroupId:String,
    created:{
        nameCreateAt : String,
        time : Date
    },
    modified:{
        nameUpdateAt : String,
        time : Date
    },
    softDelete:String,
    
});



module.exports = mongoose.model('customers', schema);
