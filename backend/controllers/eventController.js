const asyncHandler=require('express-async-handler');
const Event = require('../models/eventModel');

const eventbody =['req.body.name','req.body.desc','req.body.date' ,'req.body.poster'];

//@desc Get all Events
//@route GET /api/Event
//@access Public
const getEvents= asyncHandler( async(req,res)=>{
    const events = await Event.find();
    res.status(200).json(events);
})

//@desc Create a Event
//@route POST /api/Event
//@access Private
const createEvent= asyncHandler(async(req,res)=>{
    eventbody.map((key)=>{
        if(!key){
            res.status(400);
            throw new Error(`Please add a${key}`);
        }
    })
    
    const event = await Event.create(req.body);
    res.status(200).json(event)
    
})

//@desc Update a Event
//@route PUT /api/Event/:id
//@access Private
const updateEvent= asyncHandler(async(req,res)=>{
    const event= await Event.findById(req.params.id);

    if(!event){
        res.status(400)
        throw new Error('Event not found');
    };
    const updatedEvent=await Event.findByIdAndUpdate(req.params.id,req.body,{new:true,});

    res.status(200).send(updatedEvent);
})

//@desc Delete Event
//@route DELETE /api/Event/:id
//@access Private
const deleteEvent= asyncHandler(async(req,res)=>{
    const event = await Event.findById(req.params.id);

    if(!event){
        res.status(400);
        throw new Error('Event not found');
    }
    await Event.remove();
    res.status(200).json({id: req.params.id});
})

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent,
}