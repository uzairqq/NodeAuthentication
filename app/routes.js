module.exports = function(app,passport){

    // HOme

    app.get('/',function(req,res){
        res.render('index.ejs');
    });

    //login
    app.get('/login',function(req,res){

        res.render('login.ejs',{message: req.flash('loginMessage')});
    });

    app.post('/login', passport.authenticate('login', {
        successRedirect : '/profile', // redirect to the  profile section
        failureRedirect : '/login', // redirect back to the login
        failureFlash : true //  flash messages
    }));


    //signup
    app.get('/signup',function(req,res){
        res.render('signup.ejs',{message : req.flash('signupMessage')});
    });

    app.post('/signup', passport.authenticate('signup', {
        successRedirect : '/profile', // redirect to the profile section
        failureRedirect : '/signup', // redirect back to the signup page
        failureFlash : true // flash message
    }));

    //profile
    app.get('/profile',function(req,res){
        res.render('profile.ejs',
            {
                user : req.user
            });
    });


    //logout
    app.get('/logout',function(req,res){
        req.logout();
        res.redirect('/');
    });

};

function isLoggedIn(req, res, next) {

    // if user is logged, carry on
    if (req.isAuthenticated())
        return next();

    // if they are not go to home page
    res.redirect('/');
}