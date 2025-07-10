const express=require('express');
const router=express.Router();



router.get("/",(req,res)=>{
    if(req.session.isAdminValid){
        res.redirect("/admin")
    }
    if(req.session.isValid){
        res.render("user/user-homepage",{userName:req.session.userName})
    }
    else{
      const emailError=req.session.emailError
      const passwordError=req.session.passwordError
        res.render("user/user-login",{emailError,passwordError})  
    }
})
module.exports=router