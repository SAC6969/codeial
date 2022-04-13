const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user')
// authentication 
passport.use(new LocalStrategy({
        usernameField: 'email',
    },
    function(email,password,done){
        User.findOne({email:email},function(err,user){
            if(err){
                console.log('Error in finding user');
                return done(err);
            }
            if(!user || user.password != password){
                console.log("invalid username/pass");
                return done(null,false);
            }
            return done(null,user);
        })
    }
))

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user._id);
})

// deserializing 
passport.deserializeUser(function(id,done){  
    User.findById(id,function(err,user){
        if(err){
            return done(err);
        }
        return done(null,user);
    });
});

// check if user is authernticated

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    // if user is not signed in 
    return res.redirect('/users/sign-in');
}

passport.setAuthenticated = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookies and we are just
        // sending this to the locals for the view
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;