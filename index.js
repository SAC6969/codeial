const express = require('express');
const app = express();
const port = 8000;
const path = require('path')
const cookieParser = require('cookie-parser');
const db = require('./config/mongooes');

app.use(express.urlencoded());
app.use(cookieParser());
app.use('/',require('./routes'));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.listen(port,function(err){
    if(err){
        console.log("error at express",err);
    }
    console.log(`Server is running on Port: ${port}`);
})