const jwt = require('jsonwebtoken');

exports.protectedRoutes = (req,res)=>{

    const token = req.header("x-auth-header")

    if(!token){
        res.status(401).json({
            message:"You are not authorized"
        })
    }

    else{
        
        try {
            jwt.verify(token, process.env.JWT_TOKEN) 
        } catch {
            
            res.status(401).json({
                message:"Token is innvalid"
            })
        }
    }
}