const asyncHandler=require('express-async-handler');
const Room = require('../models/roomModel');

const roombody =['req.body.name','req.body.desc','req.body.price' ,'req.body.maxguests' ,'req.body.surface' ,'req.body.images','req.body.bookedDates'];

//@desc Get all rooms
//@route GET /api/room
//@access Public
const getRooms= asyncHandler( async(req,res)=>{
    const rooms = await Room.find();
    res.status(200).json(rooms);
})

//@desc Create a Room
//@route POST /api/room
//@access Private
const createRoom= asyncHandler(async(req,res)=>{
    roombody.map((key)=>{
        if(!key){
            res.status(400);
            throw new Error(`Please add a${key}`);
        }
    })
    
    const room = await Room.create(req.body);
    res.status(200).json(room)
    
})

//@desc Update a room
//@route PUT /api/room
//@access Private
const updateRoom= asyncHandler(async(req,res)=>{
    const room= await Room.findById(req.params.id);

    if(!room){
        res.status(400)
        throw new Error('Room not found');
    };
    const updatedroom=await Room.findByIdAndUpdate(req.params.id,req.body,{new:true,});

    res.status(200).send(updatedroom);
})

//@desc Delete room
//@route DELETE /api/room
//@access Private
const deleteRoom= asyncHandler(async(req,res)=>{
    const room = await Room.findById(req.params.id);

    if(!room){
        res.status(400);
        throw new Error('Room not found');
    }
    await room.remove();
    res.status(200).json({id: req.params.id});
})

module.exports = {
    getRooms,
    createRoom,
    updateRoom,
    deleteRoom,
}