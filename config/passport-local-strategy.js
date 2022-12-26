const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    function(email,password,done){
        //finding the user and establish the identity
        //first email is the userSchema's email and second email is the arg passed in the current function
        User.findOne({email: email}, function(err, user){
            if(err){
                console.log('Error in finding user [Passport]');
                return done(err);
            }

            if(!user || user.password!=password){
                console.log('Invalid Username/Password');
                return done(null, false);
            }

            //user is found and so we are passing the user
            return done(null,user);
        });
    }
));

//serializing the user which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});

//deserialising the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id, function(err,user){
        if(err){
            console.log('Error in finding User [Passport]');
            return done(err);
        }
        return done(null,user);
    });
});


//check if user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in, then pass on the request onto next func (controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    else
        return res.redirect('/users/sign-in');
    //if the user is not signed in
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from session cookie and we are sending this to the locals for the views
        res.locals.user =req.user;
    }
    next();
}

module.exports = passport;