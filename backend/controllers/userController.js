const asyncHandler=require('express-async-handler');
const jwt = require ('jsonwebtoken')
const bcrypt = require('bcryptjs');
const User =require('../models/userModel');

//@desc Get all users
//@route GET /api/users
//@access Private
const getUsers =asyncHandler(async(req,res)=>{
    const users=await User.find().select('-password');
    res.status(200).json(users);
});

//@desc Create a user
//@route POST /api/users
//@access Public
const signUp =asyncHandler(async(req,res)=>{
    const {fullname,email,password} =req.body;

    //checking if all fields are full
    if(!fullname || !email || !password){
         res.status(400);
         throw new Error('please add all fields');
    }

    //checking if email exists
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('email already exists');
    }

    //hashing the password for security
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);

    //creating the user
    const user = await User.create({
        fullname,
        email,
        password:hashedPassword,
    });

    //getting user infos
    if(user){
        res.status(201).json({
            _id: user.id,
            fullname: user.fullname,
            email: user.email,
            token:GenerateToken(user.id),
        });
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }
});

//@desc Authenticate a user 
//@route POST /api/users/login
//@access Public
const logIn =asyncHandler(async(req,res)=>{
    const {email,password}=req.body;

    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        res.status(200).json({
            _id: user.id,
            fullname: user.fullname,
            email: user.email,
            token:GenerateToken(user.id),
        });
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }
});

//@desc Get a user's infos
//@route GET /api/users/me
//@access Private
const getMe =asyncHandler(async(req,res)=>{
    res.status(200).json(req.user);
})
/*
//@desc Update a user
//@route PUT /api/users/:id
//@access Private
const updateUser =asyncHandler(async(req,res)=>{
      res.status(200).send('hello')
})*/

//Generate JWT 
const GenerateToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'1d',
    })
}
module.exports ={getUsers,
    logIn,
    signUp,
    getMe,
    //updateUser
}
