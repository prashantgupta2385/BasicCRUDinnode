const express=require("express")
const{handleShortIdCreation,handleShortIdVisitor,handleAnalytics,handleGetAllURL}=require("../controller/url")
const userRouter=express.Router()



userRouter.post("/",handleShortIdCreation)
userRouter.get("/",handleGetAllURL)
userRouter.get("/:shortId",handleShortIdVisitor)
userRouter.get("/analytics/:shortId",handleAnalytics)
module.exports=userRouter

