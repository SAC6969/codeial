const User = require('../models/user')

module.exports.profile = function(req, res){
    return res.render('users', {
        title: 'User Profile'
    })
}

//render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_up',{
        title:" Codial : sign Up"
    })
}

//render the sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_in',{
        title:" Codial : sign In"
    })
}

// get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing up');return}

        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('error in creating user in signing up');return}
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    })
}

//sign in
// module.exports.createSession = function(req,res){
//     // find user 
//     User.findOne({email:req.body.email},function(err,user){
//         if(err){console.log('error in finding user in signing up');return}

//         // user found 
//         if(user){
//             // handle password which don't match
//             if(user.password != req.body.password){
//                 return res.redirect('back');
//             }            
//             res.cookie('user_id',user._id);
//             return res.redirect('/')
//         }else{
//             // user not found 
//             return res.redirect('back');
//         }
//     })
// }

module.exports.createSession = function(req,res){
    return res.redirect('/');
}

//sign out

module.exports.destroySession = function(req,res){
    req.logout();

    return res.redirect('/');
}