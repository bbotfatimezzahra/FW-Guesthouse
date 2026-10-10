const mongoose = require('mongoose')

const bookingSchema = mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Room',
    },
   firstname:{
      type : String,
      required:[true, 'Please add your first name'],
    },
    lastname:{
      type : String,
      required:[true, 'Please add your last name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
    },
    phonenumber:{
      type : Number,
      required:[true, 'Please add your phone number'],
    },
    guestsnumber: {
      type: Number,
      required: [true, 'Please add the number of guests'],
    },
    arrivaldate:{
      type: Date,
      required:[true,'Please add your arrival date'],
    },
    departuredate:{
      type: Date,
      required:[true,'Please add your departure date'],
    },
    verification:{
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Booking', bookingSchema)
