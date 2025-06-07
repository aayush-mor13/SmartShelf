const jwt = require('jsonwebtoken');
require ('dotenv').config();
const secret_key = process.env.JWT_SECRET_KEY;

const verifyToken = (req,res,next) =>{
    let token;
    let authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if(authHeader && authHeader.startsWith("Bearer ")){
        token = authHeader.split(" ")[1];
    }
    if(!token){
        return res.status(400).json({message : 'No token, Authorization denied !'});
    }
    try{
        const decoded = jwt.verify(token,secret_key);
        req.user = decoded;
        console.log("The decoded user is : ",req.user);
        next();
    }
    catch(err){
        console.error("Error while Authorizing user !");
        return res.status(401).json({message : 'Invalid or Expired token !'});
    }
}

module.exports = verifyToken;