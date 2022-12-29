var jwt = require('jsonwebtoken');
let Sec_code="!1@2#3";
const fetchUser=(req,res,next)=>{
    let token=req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please authenticate with valid token"})
    }
   try {
        const data= jwt.verify(token,Sec_code)
        req.user= data
        next();
    } catch (error) {
        console.error(error)
        res.status(500).send({error:"Internal server error has occured"})

    }
}
module.exports=fetchUser