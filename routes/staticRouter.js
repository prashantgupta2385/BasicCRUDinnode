//fronted ke jitne bhi page hai unke liye

const express=require("express")
const router=express.Router();
const {handleGetdatabyForm}=require("../controller/url")
router.get("/",handleGetdatabyForm)
module.exports=router;
