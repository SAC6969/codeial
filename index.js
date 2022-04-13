const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const path = require('path')
const db = require('./config/mongooes');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local');
const expressLayouts = require('express-ejs-layouts');
const MongoStore = require('connect-mongo');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(express.static('./assets'))
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

//mongo store
app.use(session({
    name : 'codeial',
    secret : 'blahsomething',
    saveUninitialized : false,
    resave: false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl : 'mongodb://localhost/codial',
            autoRemove : 'disable'
        },
        function(err){
            console.log(err || 'connect-mongodb setup');
        }
    )
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticated);

app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log("error at express",err);
    }
    console.log(`Server is running on Port: ${port}`);
})