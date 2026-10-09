const express = require('express');
const router = express.Router();

const {getRooms,
    createRoom,
    updateRoom,
    deleteRoom}=require('../controllers/roomController');
    
const {protect}= require('../middleware/authMiddleware');

router.route('/').get(getRooms).post(protect,createRoom)

router.route('/:id').put(protect,updateRoom).delete(protect,deleteRoom)

module.exports=router;