const jwt = require("jsonwebtoken");
const JWT_SECRET = "MaheshDalle";
const fetchuser = (req, res, next)=>{
    //  Get the user from jwt token and add it to request object 

     const token = req.header('auth-token')
     if(!token){
        res.status(401).send({error:" Please Authenticate a valid Token"})
     }
     
    try {

        const string = jwt.verify(token, JWT_SECRET)
        req.user = string.user
        next()
        
    } catch (error) {
        res.status(401).send({error:" Please Authenticate a valid Token"})
    }
}
module.exports = fetchuser;
