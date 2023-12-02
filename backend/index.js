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
    
    
})

app.post('/user/login',(req,res)=>{

})

