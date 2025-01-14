//fronted ke jitne bhi page hai unke liye

const express=require("express")
const router=express.Router();

//static routes for url

const {handleGetdatabyForm}=require("../controller/url")
router.get("/",handleGetdatabyForm)



////static routes for user
const{handleUserSignUpForm, handleUserLogin}=require("../controller/user")
router.get("/SignUp",handleUserSignUpForm)
router.get("/login",handleUserLogin)

module.exports=router;
