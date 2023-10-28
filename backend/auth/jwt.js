const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config()
function validateToken(req,res,next){
try {
//extract token 
const token = req.headers["authorization"]
if(!token){
return res.json({message:"Forbidden"})
}

const validatedToken = jwt.verify(token,process.env.jwtsecret)
if(!validatedToken){
return res.json({message:"Forbidden"})
}
else{
   return next() 
}

    
} catch (error) {
  if(error.name==="TokenExpiredError"){
return res.json({message:"Forbidden"})
  }
  else{
    return res.status(500).json({error})
  }
}

}



module.exports = {validateToken}
