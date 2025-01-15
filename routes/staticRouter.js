//fronted ke jitne bhi page hai unke liye
const {restrictTo}=require("../middleware/auth")

const express=require("express")
const router=express.Router();

//static routes for url

const {handleGetdatabyForm,handleAdminUrl}=require("../controller/url")
router.get("/",restrictTo(["NORMAL","ADMIN"]),handleGetdatabyForm)
router.get("/admin/urls",restrictTo(["ADMIN"]),handleAdminUrl)



////static routes for user
const{handleUserSignUpForm, handleUserLogin}=require("../controller/user")
router.get("/SignUp",handleUserSignUpForm)
router.get("/login",handleUserLogin)
router.get("/admin/urls",restrictTo(["ADMIN"]),handleAdminUrl)

module.exports=router;
