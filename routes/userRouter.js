const express=require('express');
const router=express.Router();
const userSchema=require('../Model/User')
const userController=require('../Controller/userController')
//post request from user signup

router.post('/sign-up',userController.signUp)
router.post('/login',userController.login)
module.exports=router