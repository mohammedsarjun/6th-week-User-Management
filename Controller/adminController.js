const express=require("express")
const userSchema=require('../Model/User')
const bcrypt=require('bcrypt')
const mongoose=require('mongoose')
//adminLoginController
async function adminLogin(req,res){
    if(req.body.email==process.env.ADMIN_EMAIL){
    if(req.body.password==process.env.ADMIN_PASSWORD){
        req.session.isAdminValid=true
        res.redirect("/admin")

    }
    else{
        req.session.isAdminValid=false
         req.session.passwordError="Incorrect Password"
        res.redirect("/admin")
       
    }
    }
    else{
        req.session.isAdminValid=false
         req.session.emailError="email is not exist"
        res.redirect("/admin")
    }
    
}
//adminLogoutController
async function adminLogout(req,res){
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send("Failed to destroy session");
        }
        res.redirect("/admin");
    });
}
//createUserController
async function createUser(req,res){
    try{
        const emailExist= !!(await userSchema.findOne({email:req.body.email}))
        if(emailExist){
            res.redirect("/admin")
            req.session.emailExist="Email Already Exist"
        }
        else{
            const pass= await bcrypt.hash(req.body.password,10);
            const newUser=userSchema({
                name:req.body.name,
                email:req.body.email,
                gender:req.body.gender,
                password:pass
            })
           await newUser.save()
           res.redirect("/admin")
        }
    }
    catch(error){
    res.status(400).send("Error : "+error.message)
    }
}

//readUserController

async function readUser(req,res){
    let user=await userSchema.find()
    res.json(user)
}

//update user
async function updateUser(req,res){
    const userId = new mongoose.Types.ObjectId( req.body.id);
    const{name,email,gender}=req.body
await userSchema.updateOne({_id:userId},{name,email,gender})

res.json({message:"Updated successfully"})

}


////deleteUserController

async function deleteUser(req,res){

    const userId = new mongoose.Types.ObjectId(req.query.userId);
   await userSchema.deleteOne({_id:userId})

   res.json({message:"data deleted successfully"})
}

//searching user
async function searchUser(req,res){
const query=req.query.query

try {
    const results = await userSchema.find({ name: { $regex: query, $options: "i" } });
    res.status(200).json(results);
} catch (error) {
    console.error("Error searching users:", error);
    res.status(500).send("Failed to search users.");
}
}
module.exports={adminLogin,adminLogout,createUser,readUser,deleteUser,updateUser,searchUser}