const mongoose =require('mongoose')

const roomSchema = mongoose.Schema(
    {
        name:{
            type : String,
            required:[true, 'Please add the room name'],
            unique: true,
        },
        desc:{
            type : String,
            required:[true, 'Please add the room description'],
        },
        price: {
            type: Number,
            required: [true, 'Please add the room price'],
        },
        maxguests: {
            type: Number,
           required: [true, 'Please add the room maximum occupency'],
        },
        surface: {
            type: Number,
            required: [true, 'Please add the room surface in m²'],
        },
        images: {
            type: [String],
            required: [true, 'Please add the room photos links'],
        },
        bookeddates: {
          type:[{start:Date,end:Date}],
        },
})
module.exports= mongoose.model('Room',roomSchema);