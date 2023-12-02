var express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')


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
