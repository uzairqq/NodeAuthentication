

var localStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');

module.exports = function(passport){

    passport.serializeUser(function(user,done){
       done(null,user.id);
    });

    passport.deserializeUser(function(id,done){
        User.findById(id, function(error,user){
            done(error,user);
        });
    });

    passport.use('signup',new localStrategy({

        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },function(req,email,password,done){

        process.nextTick(function(){

            User.findOne({'local.email':email},function(err,user){
                if(err) return done(err);

                if (user) {
                    return done(null, false, req.flash('signupMessage', 'Email exists.'));
                } else {

                    // if there is no user with that email
                    // create the user
                    var newUser = new User();

                    // set new user info

                    newUser.local.email = email;
                    newUser.local.password = password;
                    newUser.local.Hashedpassword = newUser.generateHash(password);

                    newUser.save(function (err) {
                        if (err) throw err;
                        return done(null, newUser);

                    });
                }
            });

        });
    }));
            //login new user
    passport.use('login',new localStrategy({

            usernameField : 'email',
            passwordField:'password',
            passReqToCallback:true

    }, function(req,email,Hashedpassword,done){

        User.findOne({'local.email': email},function(error,user){
            if (error) return done(error);

            if(!user){
                return done(null,false,req.flash('loginMessage','User not found'));
            }
            if (!user.validPassword(Hashedpassword))
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create message to seession


            return done(null, user);
        });

    }));



};
