const asyncHandler=require('express-async-handler');
const Booking = require('../models/bookingModel');
const Token = require('../models/tokenModel');
const Room = require('../models/roomModel');
const User = require('../models/userModel');
const {sendEmail}=require('../utils/sendmail');
const crypto = require('crypto');

const resbody =['req.body.room','req.body.firstname','req.body.lastname','req.body.email' ,'req.body.phonenumber' ,'req.body.guestsnumber' ,'req.body.arrivaldate', 'req.body.departuredate'];

//@desc Get all bookings
//@route GET /api/bookings
//@access Private
const getBookings= asyncHandler( async(req,res)=>{
    const bookings = await Booking.find();
    res.status(200).json(bookings);
})

//@desc Create a booking
//@route POST /api/bookings
//@access Public
const createBooking= asyncHandler(async(req,res)=>{
    resbody.map((key)=>{
        if(!key){
            res.status(400);
            throw new Error(`Please add a${key}`);
        }
    })
    
    if (req.body.client) {
        const client=await User.findOne({id:req.body.client});
        if (!client) {
            res.status(400);
            throw new Error('Booking client not found');
        }
    }
 
    const booking = await Booking.create(req.body);

    const token = await Token.create({
        bookingId:booking._id,
        token:crypto.randomBytes(32).toString('hex'),
    });

    const url = `${process.env.BASE_URL}api/bookings/${booking._id}/verify/${token.token}`;
    const emailtext=`Email verification\nTo confirm your booking please press this link ${url} LINK EXPIRES IN 1 HOUR`;
    
    const emailBody=`<h1>Email verification</h1><br><p>To confirm your booking please press this link</p><br><a href=${url}>Verification Link</a><br><p><b>LINK EXPIRES IN 1 HOUR </b></p>`;

    await sendEmail(booking.email,"Email Verification",emailtext, emailBody);

    res.status(200).json(booking)
    
})

//@desc Verify a booking
//@route GET /api/bookings/:id/verify/:token
//@access Private
const verifyBooking = async(req,res)=>{
    try {
        const booking=await Booking.findOne({id:req.params.id});
        if(!booking)res.status(404).send({message:'Booking not found'});
        else{
            const token = await Token.findOne({bookingId:req.params.id,token:req.params.token});
            if(!token)res.status(404).send({message:'Token not valid'});
            else{
                const resupdated=await  Booking.findByIdAndUpdate(req.params.id,{verification:true},{new:true,});
                
 //               const roomupdated=await  Room.findByIdAndUpdate(resupdated.room,{},{new:true,});

                await token.remove();
                res.status(200).send({message:'Email Confirmed Proceed with Payment'});
            }
        }
    } catch (error) {
        res.status(400).send({message:`${error}`});
    }
};

//@desc Update a booking
//@route PUT /api/booking/:id
//@access Private
const updateBooking= asyncHandler(async(req,res)=>{
    const booking= await Booking.findById(req.params.id);

    if(!booking){
        res.status(400)
        throw new Error('Booking not found');
    };
    const updatedbook=await Booking.findByIdAndUpdate(req.params.id,req.body,{new:true,});

    res.status(200).send(updatedbook);
})

//@desc Delete booking
//@route DELETE /api/booking/:id
//@access Private
const deleteBooking= asyncHandler(async(req,res)=>{
    const booking = await Booking.findById(req.params.id);

    if(!booking){
        res.status(400);
        throw new Error('Booking not found');
    }
    await booking.remove();
    res.status(200).json({id: req.params.id});
})

module.exports = {
    getBookings,
    createBooking,
    verifyBooking,
    updateBooking,
    deleteBooking,
}
