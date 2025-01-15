// ye poor Code indivisully check kr kr rha tha  loeed user iska ach atrika neeche likha hi
// const {getUser}=require("../service/auth")

// async function restrictToLoggedinUserOnly(req,res,next){
//     console.log(req)
//     const userUid= req.cookies.uid;
    
//     if(!userUid)return res.redirect("/login");
//     const user=getUser(userUid);
//     if(!user) return res.redirect("/login");
//     req.user=user;
//     next();
// }
// async function checkAuth(req,res,next){
    
//     const userUid= req.cookies.uid;
    
    
//     const user=getUser(userUid);
    
//     req.user=user;
//     next();
    
// }

// module.exports={restrictToLoggedinUserOnly,checkAuth}



const {getUser}=require("../service/auth");
function checkForAuthentication(req,res,next){
    const tokenCookie=req.cookies?.token;
    req.user=null

    if(!tokenCookie)return next();

    const token=tokenCookie;
    const user=getUser(token);
    req.user = user;
    return next();
}

function restrictTo(roles=[]){
    return function(req,res,next){
        if(!req.user)return res.redirect("/login");
        if(!roles.includes(req.user.role)) return res.end("unauthorised")
        return next();

    }
}
module.exports={
    restrictTo,
    checkForAuthentication
}