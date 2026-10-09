const mongoose = require('mongoose');

const serviceSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'please add a name'],
    },
    icon:{
        type:String,
        required:[true,'please add an image'],
    }
});

module.exports=mongoose.model('Service',serviceSchema);