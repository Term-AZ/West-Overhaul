const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser');
dotenv.config()

const validate_token = (req,res,next) =>{
    const accessToken = req.cookies['jwtToken']
    if(!accessToken){
        return res.status(401).send({"msg":'Access Denied. No token provided.'})
    }
    try {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY)
        req.userid = decoded.id
        res.email = decoded.email
        next();
    }catch(error){
        console.log(error)
        return res.status(400).send({"msg":'Invalid Token.'});
    }
}
module.exports = validate_token