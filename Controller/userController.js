const userSchema=require('../Model/User')
const bcrypt=require('bcrypt')


//signup controller
async function signUp(req,res){
try{
    const emailExist= !!(await userSchema.findOne({email:req.body.email}))
    console.log(emailExist)
    if(emailExist){
        res.redirect("/signup")
        req.session.emailError="Email Already Exist"
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
       req.session.isValid=true
       req.session.userName=req.body.name
       res.redirect("/")
    }
}
catch(error){
res.status(400).send("Error : "+error.message)
}
}

//login controller

async function login(req,res){
    let user= await userSchema.findOne({email:req.body.email})
    if(user){
        req.session.emailError=null
        let isMatch= await bcrypt.compare(req.body.password,user.password)
        if(isMatch){
            req.session.passwordError=null
            req.session.isValid=true
            req.session.userName=user.name
            res.redirect("/")
        }
        else{
            req.session.passwordError="Password is incorrect"
            res.redirect("/")
        }
    }
    else{
        req.session.emailError="User Not found"
        res.redirect("/")
    }
}

module.exports={signUp,login}