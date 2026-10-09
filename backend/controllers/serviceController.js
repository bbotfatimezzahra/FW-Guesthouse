const asyncHandler=require('express-async-handler');
const Service = require('../models/serviceModel');

const servicebody =['req.body.name','req.body.icon'];

//@desc Get all services
//@route GET /api/services
//@access Public
const getServices= asyncHandler( async(req,res)=>{
    const services = await Service.find();
    res.status(200).json(services);
})

//@desc Create a service
//@route POST /api/services
//@access Private
const createService= asyncHandler(async(req,res)=>{
    servicebody.map((key)=>{
        if(!key){
            res.status(400);
            throw new Error(`Please add a ${key}`);
        }
    })
    
    const service = await Service.create(req.body);
    res.status(200).json(service)
    
})

//@desc Update a service
//@route PUT /api/services/:id
//@access Private
const updateService= asyncHandler(async(req,res)=>{
    const service= await Service.findById(req.params.id);

    if(!service){
        res.status(400)
        throw new Error('Service not found');
    };
    const updatedService=await Service.findByIdAndUpdate(req.params.id,req.body,{new:true,});

    res.status(200).send(updatedService);
})

//@desc Delete Service
//@route DELETE /api/Service/:id
//@access Private
const deleteService= asyncHandler(async(req,res)=>{
    const service = await Service.findById(req.params.id);

    if(!service){
        res.status(400);
        throw new Error('Service not found');
    }
    await service.remove();
    res.status(200).json({id: req.params.id});
})

module.exports = {
    getServices,
    createService,
    updateService,
    deleteService,
}