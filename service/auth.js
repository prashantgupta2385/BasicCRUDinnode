// const sessionIdTouserMap=new Map();

// function setUser(id,user){
//     sessionIdTouserMap.set(id,user);
// }
// function getUser(id){
//     return sessionIdTouserMap.get(id);
// }
// module.exports={
//     setUser,
//     getUser,
// }


// y hai jwt web tokenke liye upar wal uuid id ki help se session me store krke statfull authentication



const  jwt=require("jsonwebtoken")
const secret="Prashant123@"
function setUser(user){
   return jwt.sign({
    _id:user._id,
    email:user.email,
    role:user.role
   },secret)
}
function getUser(token) {
    if (!token) return null;
    try {
        
        return jwt.verify(token, secret); // Verify and decode the token
    } catch (error) {
        console.error('JWT Verification Error:', error.message); // Log the error
        return null; // Return null if the token is invalid
    }
}

module.exports={
    setUser,
    getUser,
}