const mongoose = require('mongoose');

const tokenSchema = mongoose.Schema({
    bookingId:{
        type: mongoose.Schema.Types.ObjectId,
        required:[true,'user id not found'],
        unique: true,
        ref:'User',
    },
    token:{
        type:String,
        required:[true]
    },
    createdat:{
        type:Date,
        default:Date.now,
        expires:3600 //1 hour
    }
});

module.exports=mongoose.model('Token',tokenSchema);
