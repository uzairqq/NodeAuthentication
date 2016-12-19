/**
 * Created by HP_PC on 12/17/2016.
 */
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');

var app = express();


mongoose.connect( 'mongodb://aj160:aj160@ds139448.mlab.com:39448/newapp',function(error){
    if(error) {console.log(error);}
    else {console.log('Connected to database');}
});

require('./config/passport')(passport);

var port = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine','ejs');

app.use(session({secret : 'AhsanJ'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./app/routes.js')(app,passport);

app.listen(port);
console.log('Application is running at ' + port);























/*
mongoose.connect(config.database);
app.set('superSecret', config.secret);


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.get('/setup',function(req,res){

    var aj = new User({
        name : "Ahsan Jamal",
        password:"password",
        admin:true
    });

    aj.save(function(error){
        if (error) throw error;

        console.log('User created successfully');
        res.json({success : true});
    });

});

var apiRoutes = express.Router();




apiRoutes.post('/authenticate',function(req,res){


    User.findOne({
        name:req.body.name
    },function(error,user){
        if (error)throw error;

        if(!user){
            res.json({success : false, message: 'Authentication Failed. User not found'});
        }else if(user){

            if(user.password != req.body.password){
                res.json({success:false,message:'Authentication failed. Wrong Password'});
            }else{

                var token = jwt.sign(user,app.get('superSecret'),{
                    expiresIn:1440 //24 hours
                });

                res.json({
                    success:true,
                    message:'Token Created',
                    token: token
                })
            }

        }

    });
});


apiRoutes.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(error, decoded) {
            if (error) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        });

    }

});


apiRoutes.get('/' , function(req,res){
    res.json('Api working perfectly');
});

apiRoutes.get('/users',function(req,res){
    User.find({},function(err,user){
        res.json(user);
    });
});
app.use('/api',apiRoutes);

app.get('/',function(req,res){
    res.send("APi is at http://localhost:" + port + "/api");
});



app.listen(port);
console.log("Server started at port: " + port);
    */

