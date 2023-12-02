var express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

const bcrypt = require('bcrypt')
const saltRounds=10

var validate_email = require('./validate/validate_email.js')
var validate_password = require('./validate/validate_password.js')
const db = require('./db/db.js')

var app = express();
const port = 8000;

app.use('/', express.static('../wds-overhaul'))
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.listen(port, ()=>{
    console.log(`Listen on port ${port}`)
})


app.post('/user/register', (req,res)=>{
    const {email, nickname, password} = req.body
    if(!validate_email(email)){
        return res.status(400).send({"msg": "Please input valid email"})
    }
    if(!validate_password(password)){
        return res.status(400).send({"msg": "Password must be 6-16 character long and must contain at least one number and special character"})
    }

    var q = "SELECT * FROM users where user_email = ?"
    db.query(q, [email], (err,result)=>{
        if(err) {console.log(err); return res.status(500).send({"msg": "Error has occured"}) }
        console.log(result)
        if(result.length == 0){
            bcrypt.genSalt(saltRounds, function(err,salt){
                if(err) {console.log(err); return res.status(500).send({"msg": "Error has occured"}) }
                bcrypt.hash(password, salt, function(err,hash){
                    var dbstatement = "INSERT INTO users(user_name, user_email, user_password) VALUES(?,?,?)"
                    db.query(dbstatement, [nickname, email, hash], (err2)=>{
                        if(err2) {console.log(err2);return res.status(500).send({"msg": "Error has occured"})}
                        return res.status(200).send({"msg":"User added"})
                    })
                })
            })
        }else{
            return res.status(400).send({"msg": "Account with this email already exists"})
        }
    })
    
})

app.post('/user/login',(req,res)=>{
    const {email , password} = req.body
    var q ="SELECT * FROM users WHERE user_email = ?"
    db.query(q,[email], (err,result)=>{
        if(result[0] ==null){
            return res.status(400).send({"msg":"Email not registered "})
        }
        bcrypt.compare(password, result[0].user_password, function(err, hashresult){
            if(err){console.log(err) ; return res.status(500).send({"msg":"Error has occured"})}
            if(hashresult){
                // var token = generate_token({id:result[0].id,email: email, admin:result[0].admin})
                // return res
                //     .cookie('refreshToken', generate_refresh({email: email, admin:result[0].admin}), { httpOnly: true, sameSite: 'strict',path:"/" })
                //     .header('Authorization', token)
                //     .json({
                //             id: result[0].id,
                //             email: email,
                //             admin: result[0].admin,
                //             authorization:  token
                //         });
            }else{
                return res.status(400).send({"msg":"Password does not match"})
            }
        })
        
    })
})

