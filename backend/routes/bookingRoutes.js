const express = require('express');
const router = express.Router();

const {getBookings,
    getBooking,
    createBooking,
    verifyBooking,
    updateBooking,
    deleteBooking
}=require('../controllers/bookingController');
const {protect}=require('../middleware/authMiddleware');

router.route('/').get(protect,getBookings).post(createBooking);

router.get('/:id/verify/:token',verifyBooking);

router.route('/:id').get(protect,getBooking).put(protect,updateBooking).delete(protect,deleteBooking);

module.exports=router;
