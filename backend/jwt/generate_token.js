const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const generate_token = (data) =>{
    let jwtSecretKey = process.env.JWT_SECRET_KEY  
    const token = jwt.sign(data, jwtSecretKey, {expiresIn: "6h"})
    return token
}

module.exports = generate_token