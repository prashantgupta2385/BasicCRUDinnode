const express=require("express")

const path=require("path")
const {connectMongoDb}=require("./connection");
const urlRouter=require("./routes")
// const { restrictToLoggedinUserOnly,checkAuth}=require("./middleware/auth")
const {restrictTo,checkForAuthentication}=require("./middleware/auth")
const staticRouter=require("./routes/staticRouter")
const userRouter=require("./routes/user");
const cookieParser = require("cookie-parser");
const app=express()
const PORT=8001

//connection
connectMongoDb("mongodb://127.0.0.1:27017/shorturls").then(()=>{console.log("MongoDB sucessfully connected")})
 .catch((err)=>{console.log("this is the error",err)})

const routes=express.Router();

//views

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))



//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication)


//routes
app.use("/URL",restrictTo(["NORMAL","ADMIN"]),urlRouter);
app.use("/",staticRouter);
app.use("/user",userRouter);


app.listen(PORT,()=>{
    console.log("started")
})