const express=require('express')
const session = require('express-session')
const path=require('path')
const mongoose=require('mongoose')
const userRouter=require('./routes/userRouter')
const mainRouter=require('./routes/mainRouter')
const adminRouter=require('./routes/adminRouter')

const nocache = require('nocache')
 require("dotenv").config()


//Initializing the app
const app=express()



//Clear chache
app.use(nocache())
//session handling
app.use(session({
  secret: 'yourSecretKey',
  resave: false,           
  saveUninitialized: true,  
  cookie: { secure: false }
}))

//Middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(path.join(__dirname,"Public")))

// Set EJS as the view engine
app.set("view engine","ejs")



// connecting to Mongodb
mongoose.connect('mongodb://localhost/ytUserDb').then(()=>{
    console.log('Server connected to mongodb.')
}).catch((err)=>{
    console.log("error:"+err)
})
// Router middleware
app.use("/",mainRouter)
app.use("/user",userRouter)
app.use("/admin",adminRouter)

//redirecting
app.get("/signup",(req,res)=>{
    let emailError=req.session.emailError||null
    if(req.session.isValid){
        res.redirect("/")
    }
    else{
        res.render("user/user-signup",{emailError})
    }
})

app.get("/login",(req,res)=>{
    if(req.session.isValid){
        res.redirect("/")
    }
    else{
        res.render("user/user-login",{emailError:null,passwordError:null})
    }
})

app.get("/admin",(req,res)=>{
    let emailError=req.session.emailError||null
    let passwordError=req.session.passwordError||null
    if(req.session.isAdminValid){
          res.render("admin/admin-dashboard",)
    }
    else{
        res.render("admin/admin-login",{emailError,passwordError})
    }
   
})


//session destroying

app.get("/logout",(req,res)=>{
    req.session.destroy()
    res.redirect("/")
})


app.listen(process.env.DB_PORT,(err)=>{
    if(err){
        console.log("Have an error")
    }
    else{
        console.log("server is running on "+process.env.DB_PORT)
    }
})