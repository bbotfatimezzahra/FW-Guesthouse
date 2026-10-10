const express =require('express');
const router = express.Router();

const {getUsers,
    login,
    register,
    getMe,
    updateUser
}=require('../controllers/userController');
const {protect}=require('../middleware/authMiddleware')

router.get('/',getUsers)
router.post('/login',login);
router.post('/register',register);
router.get('/me',protect,getMe);
router.put('/update',protect,updateUser);

module.exports =router;
