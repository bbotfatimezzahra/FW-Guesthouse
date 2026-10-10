const express = require('express');
const router = express.Router();

const {getEvents,
    getEvent,
    createEvent,
    updateEvent,
    deleteEvent}=require('../controllers/eventController');
const {protect}=require('../middleware/authMiddleware');

router.route('/').get(getEvents).post(protect,createEvent)

router.route('/:id').get(getEvent).put(protect,updateEvent).delete(protect,deleteEvent)

module.exports=router;
