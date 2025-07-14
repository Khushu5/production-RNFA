const express=require('express');
const { registerController, loginController ,updateUserController,requireSignIn} = require('../controllers/userController');

//router object
const router=express.Router();


//routes
 
//Register routes
router.post('/register',registerController);

//login routes
router.post('/login',loginController);

//update user details routes

router.put('/update-user', requireSignIn,updateUserController);


//export
module.exports=router