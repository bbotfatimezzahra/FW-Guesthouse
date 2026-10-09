const mongoose =require ('mongoose');

const eventSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'please add a name']
    },
    description:{
        type:String,
        required:[true,'please add a description']
    },
    date:{
        type:Date,
        required:[true,'please add a date']
    },
    poster:{
        type:String,
        required:[true,'please add a poster']
    }
});

module.exports=mongoose.model('Event',eventSchema);