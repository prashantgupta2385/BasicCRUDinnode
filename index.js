const express=require("express")
const userRouter=require("./routes")
const path=require("path")
const {connectMongoDb}=require("./connection");
const staticRoute=require("./routes/staticRouter")
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


//routes
app.use("/URL",userRouter);
app.use("/",staticRoute)


app.listen(PORT,()=>{
    console.log("started")
})