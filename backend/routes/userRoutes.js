const express =require('express');
const router = express.Router();

const {getUsers,
    logIn,
    signUp,
    getMe,
    //updateUser
}=require('../controllers/userController');
const {protect}=require('../middleware/authMiddleware')

router.get('/',getUsers)
router.post('/login',logIn);
router.post('/signup',signUp);
router.get('/me',protect,getMe);
//router.put('/update',protect,updateUser);

module.exports =router;
